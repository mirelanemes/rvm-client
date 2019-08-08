import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '@app/core/service/users.service';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
	form: FormGroup;
	role: string;
	id: string;
	user: any = {};

	constructor(private fb: FormBuilder,
		private router: Router,
		public route: ActivatedRoute,
		private usersService: UsersService) { }

	ngOnInit() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			email: ['', Validators.required],
			phone: ['', Validators.required]
		});

		if (this.route.snapshot.paramMap.get('role')) {
			this.role = this.route.snapshot.paramMap.get('role');
		}

		if (this.route.snapshot.paramMap.get('id')) {
			this.id = this.route.snapshot.paramMap.get('id');

			this.getData();
		}
	}

	getData() {
		// this.usersService.getUser(this.route.snapshot.paramMap.get('id')).subscribe(response => {
		// 	console.log(response);
		// });

		// TEMP
		this.usersService.getUsers({}).subscribe(element => {
			if (element.data) {
				this.user = element.data.find((elem: any) => elem._id === this.id);
				this.editForm();
			}
		});
	}

	editForm() {
		this.form.controls['name'].setValue(this.user.name);
		this.form.controls['email'].setValue(this.user.email);
		this.form.controls['phone'].setValue(this.user.phone);
	}

	onSubmit() {
		this.user.name = this.form.value.name;
		this.user.email = this.form.value.email;
		this.user.phone = this.form.value.phone;

		if (this.role) {
			this.user.role = this.role;
		}

		if (this.user._id) {
			// edit
			console.log('edit');
			// this.usersService.updateUser(user).subscribe((response) => {
			// 	this.router.navigate(['users']);
			// });
		} else {
			// add
			console.log('add');
			// this.usersService.addUser(user).subscribe((response) => {
			// 	this.router.navigate(['users']);
			// });
		}
	}
}