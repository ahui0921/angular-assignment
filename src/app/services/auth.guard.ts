import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router) { }
	canActivate(): boolean {
		if (!this.authService.isAuthenticated()) {
			this.router.navigate(['reg-form']);
			return false;
		}
		return true;
	}

}
