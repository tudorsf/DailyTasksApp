namespace API.Models
{
    public class ToDo
    {   
        public int Id { get; set; }
        public string ActivityName { get; set; }

        public bool isCompleted { get; set; }

        public DateTime Date { get; set; }

        public int DayId { get; set; }


    }
}
