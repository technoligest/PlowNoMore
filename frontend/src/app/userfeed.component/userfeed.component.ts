import { Component, ViewChild } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { MatMenuTrigger } from '@angular/material';


class User {
  username: string;
  name: string;
  years: number;
  rating: number;
  profilePictureLink: string;
  portfolioImagesLinks: string[];

  constructor(username: string, name: string, years: number, rating: number, profilePicture: string, portfolioImagesLinks: string[]) {
    this.username = username;
    this.name = name;
    this.years = years;
    this.rating = rating;
    this.profilePictureLink = profilePicture;
    this.portfolioImagesLinks = portfolioImagesLinks;
  }
}

@Component({
  selector: 'user-feed',
  templateUrl: './userfeed.component.html',
  styleUrls: ['./userfeed.component.scss']
}) 
export class UserFeedComponent {
  @ViewChild(MatMenuTrigger) contextMenus: MatMenuTrigger;

  openContextMenu(event, matmenu) {
    event.preventDefault();
    console.log(matmenu);
    document.getElementById(matmenu).click();
    // this.contextMenus.openMenu();
  }
  users: User[]= [new User("Muhab","Muhab",15,2,"https://placekitten.com/400/400",["https://placekitten.com/400/400","https://placekitten.com/400/400","https://placekitten.com/400/400","https://placekitten.com/400/400","https://placekitten.com/400/400"]),
                  new User("Ehab1","Ehab",4,4,"https://placekitten.com/100/400",["https://placekitten.com/400/400","https://placekitten.com/400/400","https://placekitten.com/400/400","https://placekitten.com/400/400","https://placekitten.com/400/400"]),
                  new User("Ehab2","Yaser",125,4,"https://placekitten.com/300/400",["https://placekitten.com/400/400","https://placekitten.com/400/400","https://placekitten.com/400/400","https://placekitten.com/400/400","https://placekitten.com/400/400"]),
                  new User("Ehab3","Alisar",19,4,"https://placekitten.com/400/200",["https://placekitten.com/400/400","https://placekitten.com/400/400","https://placekitten.com/400/400","https://placekitten.com/400/400","https://placekitten.com/400/400"])
                ]
  name = 'Photo On Demandd';
  color = "blue"
  ratingStar= faCoffee;
}
