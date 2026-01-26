using Rolayther.Data;
using Rolayther.Models.Entities;

namespace Rolayther.Services
{
    public class ServiceBase
    {
        protected readonly ApplicationDbContext _context;

        protected ServiceBase(ApplicationDbContext context)
        {
            _context = context;
        }
        protected async Task<bool> SaveAsync()
        {

            bool result = false;

            try
            {
                result = await _context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return result;
        }
        protected async Task<bool> SoftDeleteAsync<T>(Guid id) where T : BaseEntity
        {
            var entity = await _context.Set<T>().FindAsync(id);

            if (entity == null)
                return false;

            entity.IsDeleted = true;

            _context.Set<T>().Update(entity);

            return await SaveAsync();
        }
    }
}
