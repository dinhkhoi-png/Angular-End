import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  data: any;


  constructor() { }

  ngOnInit(): void {
   
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
}
