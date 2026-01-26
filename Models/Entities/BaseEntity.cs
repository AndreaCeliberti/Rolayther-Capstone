namespace Rolayther.Models.Entities
{
    public abstract class BaseEntity
    {
        public bool IsDeleted { get; set; } = false;
    }
}
