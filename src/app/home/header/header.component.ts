import { Component, OnInit } from '@angular/core';
import { ChangeDataService } from 'src/app/service/change-data.service';
import { UserService } from "../../service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login: boolean = false
  user: string = ''
  totalItem: number = 0
  listItemArray: any;

  constructor(private userService: UserService, private service: ChangeDataService) { }

  isFirst:boolean = true
  ngOnInit(): void {
    let isLogin = localStorage.getItem('user')
    if (isLogin) {
      this.login = true
      this.user = isLogin
    }

    this.service.dataRes$
      .subscribe((res: any) => {
        this.listItemArray = res
        if (this.isFirst) {
          this.totalItem= 0
          this.isFirst =false
        }else{
          this.totalItem++
        }
      })
      

  }

  showTotalItem() {
    return this.listItemArray.length && 0

  }

  logOut() {
    this.userService.logOut()
  }



}
