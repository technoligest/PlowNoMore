using System;
namespace PlowNoMoreAPI.Classes
{
    public class LineItem
    {
        public string description { get; set; }
        public double cost { get; set; }
        public LineItem(string description, double cost)
        {
            this.description = description;
            this.cost = cost;
        }
    }
}
