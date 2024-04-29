import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompanyService } from '@app/_services';
import { Company, Department, User } from '@app/_models';
import { UserProfile } from '@app/_models/userProfile';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {

  companies = null;
  departments = null;
  companyList: Company[] = [];
  departmentList: Department[];
  usersList: UserProfile[];
  public company: Observable<Company>;
  slides: any = [[]];
  searchButton: any;
  searchInput: any;
  role: string;
  username: string;
  term: string;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {

    this.role = localStorage.getItem('role');
    this.username = localStorage.getItem('username');

    this.companyService.getAllCompanies()
      .subscribe((companies: Company[]) => {
        if (this.role == 'Consultant' || this.role == 'User') {
          companies.forEach(x => {
            console.log(x);
            let isUserExist = x.users.filter(o2 => o2.username === this.username);
            if (isUserExist.length !== 0)
              this.companyList.push(x);
          })
          console.log(this.companyList);
        } else {
          this.companyList = companies;
        }
        this.slides = this.chunk(this.companyList, 3);
      });
  }

  restrictedCompanyAccess() { }

  deleteCompany(id: string) {
    const company = this.companies.find(x => x.id === id);
    company.isDeleting = true;
    this.companyService.delete(id)
      .pipe(first())
      .subscribe(() => this.companies = this.companies.filter(x => x.id !== id));
  }

  chunk(arr: any, chunkSize: any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
}