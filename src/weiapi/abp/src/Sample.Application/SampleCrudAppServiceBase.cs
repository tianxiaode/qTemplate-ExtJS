using System.Linq;
using System.Linq.Dynamic.Core;
using System.Runtime.InteropServices;
using Abp;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq;
using Abp.Linq.Extensions;
using Newtonsoft.Json.Linq;

namespace Sample
{

    public abstract class SampleCrudAppServiceBase<TEntity, TEntityDto, TPrimaryKey, TGetAllInput> : SampleAppServiceBase
        where TEntity : class, IEntity<TPrimaryKey>
    {
        protected readonly IRepository<TEntity, TPrimaryKey> Repository;
        public IAsyncQueryableExecuter AsyncQueryableExecuter { get; set; }

        protected SampleCrudAppServiceBase(IRepository<TEntity, TPrimaryKey> repository)
        {
            Repository = repository;
            AsyncQueryableExecuter = NullAsyncQueryableExecuter.Instance;
        }

        protected virtual string GetPermissionName { get; set; }

        protected virtual string GetAllPermissionName { get; set; }

        protected virtual string CreatePermissionName { get; set; }

        protected virtual string UpdatePermissionName { get; set; }

        protected virtual string DeletePermissionName { get; set; }

        private const string SortFormatString = "{0} {1}";

        protected virtual IQueryable<TEntity> ApplySorting(IQueryable<TEntity> query, TGetAllInput input, JObject allowSorts)
        {
            if(allowSorts == null) throw new AbpException("NoAllowSorts");
            var first = allowSorts.Properties().FirstOrDefault();
            if (first == null || string.IsNullOrEmpty((string)first.Value)) throw new AbpException("NoAllowSorts");
            var defaultSort = string.Format(SortFormatString, first.Value, "");
            var sortInput = (ISortedResultRequest) input;
            if (sortInput == null) return query.OrderBy(defaultSort);
            if (sortInput.Sorting.IsNullOrEmpty()) return query.OrderBy(defaultSort);
            var sortObject = JArray.Parse(sortInput.Sorting);
            var q = from p in sortObject
                let name = (string)p["property"]
                let dir = (string)p["direction"] == "ASC" ? "ASC" : "DESC"
                from System.Collections.Generic.KeyValuePair<string, JToken> property in allowSorts
                let submitName = property.Key
                where name.Equals(submitName)
                select string.Format(SortFormatString, property.Value, dir);
            var sorter = string.Join(",", q);
            return string.IsNullOrEmpty(sorter) ? query.OrderBy(defaultSort) : query.OrderBy(sorter);
        }

        protected virtual IQueryable<TEntity> ApplyPaging(IQueryable<TEntity> query, TGetAllInput input)
        {
            //Try to use paging if available
            var pagedInput = (IPagedResultRequest) input;
            if (pagedInput != null)
            {
                return query.PageBy(pagedInput);
            }

            //Try to limit query result if available
            var limitedInput = (ILimitedResultRequest) input;
            if (limitedInput != null)
            {
                return query.Take(limitedInput.MaxResultCount);
            }

            //No paging
            return query;
        }

        protected virtual TEntityDto MapToEntityDto(TEntity entity)
        {
            return ObjectMapper.Map<TEntityDto>(entity);
        }

    }
}