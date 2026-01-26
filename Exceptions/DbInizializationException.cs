namespace Rolayther.Exceptions
{
    public class DbInizializationException : Exception
    {
        public DbInizializationException() : base("Errore durante L'inizializzazione del database.")
        {
        }
        public DbInizializationException(string message) : base(message)
        {
        }
        public DbInizializationException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
