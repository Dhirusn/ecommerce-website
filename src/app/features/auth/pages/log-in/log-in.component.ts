import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { LoginDto } from '../../../../models/auth';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;
  showPassword = false;

  // captured return url
  private returnUrl = '/home';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // prefer snapshot for one-time read; subscribed approach works too if you expect changes
    const q = this.route.snapshot.queryParamMap.get('returnUrl');
    if (q) {
      this.returnUrl = this.safeReturnUrl(q);
    }
  }

  // basic safety: disallow external absolute URLs (http/https) to avoid open-redirects
  private safeReturnUrl(url: string): string {
    try {
      // if it looks like an absolute url, reject and fallback
      const isAbsolute = /^(http|https):\/\//i.test(url);
      if (isAbsolute) return '/home';
      // you could add additional checks here (allowed prefixes, etc.)
      return url || '/home';
    } catch {
      return '/home';
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;

    const payload: LoginDto = this.loginForm.value;

    this.authService.login(payload).subscribe({
      next: (res: any) => {
        // save tokens
        this.authService.saveTokens(res);

        // navigate to returnUrl
        // use navigateByUrl so urls like '/products/123' work fine
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err: any) => {
        this.errorMessage = err?.error || err?.message || 'Login failed';
        this.loading = false;
      },
      complete: () => (this.loading = false)
    });
  }
}
