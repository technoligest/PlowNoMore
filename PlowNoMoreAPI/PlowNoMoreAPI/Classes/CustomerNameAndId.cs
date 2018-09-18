using System;
namespace PlowNoMoreAPI.Classes
{
    public class CustomerNameAndId
    {
        public string name { get; set; }
        public string id { get; set; }
        public CustomerNameAndId(string name, string id)
        {
            this.name = name;
            this.id = id;
        }
    }
}
