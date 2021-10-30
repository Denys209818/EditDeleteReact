using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToastrWithAuthorization.Data.Identity;
using ToastrWithAuthorization.Models;

namespace ToastrWithAuthorization.Mapper
{
    public class MyAutoMapper : Profile
    {
        public MyAutoMapper()
        {
            this.CreateMap<UserViewModel, AppUser>()
                .ForMember(x => x.Image, y => y.Ignore())
                .ForMember(x => x.UserName, y => y.MapFrom(z => z.Email));
        }
    }
}
