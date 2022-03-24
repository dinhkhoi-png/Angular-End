import { Component, OnInit } from '@angular/core';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user_name: string | any

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user_name = localStorage.getItem('user')
  }
  sidebarToggle() {

    let sidebar = document.getElementById('sidebar');

    if (sidebar?.style.display === "none") {
      sidebar.style.display = "block";
      return
    }

    sidebar!.style.display = "none";

  }

  profileToggle() {
    var profileDropdown = document.getElementById('ProfileDropDown');
    if (profileDropdown?.style.display === "block") {
      profileDropdown.style.display = "none";
    } else {
      profileDropdown!.style.display = "block";
    }
  }

  logOut() {
    console.log(1);
    localStorage.removeItem('user')
    this.userService.logOut()
  }
}
