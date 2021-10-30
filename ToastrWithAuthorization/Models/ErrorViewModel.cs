using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToastrWithAuthorization.Models
{
    public class ErrorViewModel
    {
        public ErrorViewModel()
        {
            Errors = new ErrorItem();
        }
        public ErrorItem Errors { get; set; }
    }

    public class ErrorItem
    {
        public ErrorItem()
        {
            Invalid = new List<string>();
        }
        public List<string> Invalid { get; set; }
    }

}
