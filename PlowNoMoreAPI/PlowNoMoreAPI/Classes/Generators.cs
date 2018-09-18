using System;
using System.Linq;
namespace PlowNoMoreAPI.Classes
{
    public class Generators
    {
        public Generators(){
        }

        public static string generateCustomerId()
        {
            string uniqueGeneratedId = "";
            bool unique = false;
            while(!unique){
                uniqueGeneratedId = generateGeneralID();
                unique = true;
                Globals.customers.ForEach((Customer customer) =>
                {
                    if (customer.id.Equals(uniqueGeneratedId))
                    {
                        unique = false;
                        return;
                    }
                });
            }
            return uniqueGeneratedId;
        }

        public static string generateInvoiceId(){
            string uniqueGeneratedId = "";
            bool unique = true;
            do
            {
                uniqueGeneratedId = generateGeneralID();
                Globals.invoices.ForEach((Invoice invoice) =>
                {
                    if (invoice.id.Equals(uniqueGeneratedId))
                    {
                        unique = false;
                        return;
                    }
                });
            } while (!unique);
            return uniqueGeneratedId;
        }

        private static Random random = new Random();

        private static string generateGeneralID(){
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 20)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
