import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit {
  credentialForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private chatService: AuthService
  ) {}

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.chatService.signUp(this.credentialForm.value).then(
      user => {
        loading.dismiss();
        this.router.navigateByUrl('/welcome/tutorial', { replaceUrl: true });
      },
      async err => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Sign Up failed',
          message: err.message,
          buttons: ['OK']
        });

        await alert.present();
      }
    );
  }

  get email() {
    return this.credentialForm.get('email');
  }

  get username() {
    return this.credentialForm.get('username');
  }

  get password() {
    return this.credentialForm.get('password');
  }

  get confirm_password() {
    return this.credentialForm.get('confirm_password');
  }
}
