import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  sidebarItems = [
    { label: 'Profile', icon: 'bi-person', route: '#' },
    { label: 'Order History', icon: 'bi-clock-history', route: '#' },
    { label: 'My Reviews', icon: 'bi-chat-left-text', route: '#' },
    { label: 'Personal Offers', icon: 'bi-gift', route: '#' },
    { label: 'Discounts and Bonuses', icon: 'bi-ticket-perforated', route: '#' },
    { label: 'My Wallet', icon: 'bi-wallet2', route: '#' },
    { label: 'Help or Complaint', icon: 'bi-question-circle', route: '#' },
    { label: 'Log out', icon: 'bi-box-arrow-right', route: '#' },
  ];

  profileForm!: FormGroup;
  showPersonalInfo = true;
  showSecurity = false;
  showContactInfo = false;
  showDelivery = false;
  showInterests = false;
  showAdditional = false;

  avatarPreview: string | ArrayBuffer | null = null;
  loading = false;
  savedValuesSnapshot: any = null; // to restore on cancel

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      // Personal Info
      firstName: ['Diana', Validators.required],
      secondName: ['Prince', Validators.required],
      nickname: [''],
      dateOfBirth: ['2001-06-18', Validators.required],
      gender: ['Female', Validators.required],
      country: ['Ukraine', Validators.required],

      // Security
      currentPassword: [''],
      newPassword: [''],
      confirmNewPassword: [''],

      // Contact Info
      email: ['diana@example.com', [Validators.required, Validators.email]],
      phone: ['+380501234567'],

      // Delivery address
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      state: [''],
      zipCode: [''],

      // Interests & Additional
      interests: ['Travel, Food'],
      additionalInfo: ['']
    });

    // keep a snapshot to restore on cancel
    this.savedValuesSnapshot = this.profileForm.value;
  }

  //#region avatar
  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => (this.avatarPreview = reader.result);
    reader.readAsDataURL(file);
  }

  removeAvatar() {
    this.avatarPreview = null;
    // you could also clear a avatar form control or flag for backend deletion
  }
  //#endregion

  toggleSection(section: string) {
    // simple toggle - you can change to only-one-open by closing others first
    switch (section) {
      case 'personal': this.showPersonalInfo = !this.showPersonalInfo; break;
      case 'security': this.showSecurity = !this.showSecurity; break;
      case 'contact': this.showContactInfo = !this.showContactInfo; break;
      case 'delivery': this.showDelivery = !this.showDelivery; break;
      case 'interests': this.showInterests = !this.showInterests; break;
      case 'additional': this.showAdditional = !this.showAdditional; break;
    }
  }

  onCancelPersonal() {
    // revert changes in the form to previously saved snapshot
    this.profileForm.patchValue(this.savedValuesSnapshot);
    this.avatarPreview = null; // or restore previous avatar url if you have one
  }

  onSavePersonal() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    // Simulate API call - replace with actual HTTP request
    setTimeout(() => {
      this.loading = false;
      this.savedValuesSnapshot = this.profileForm.value; // update snapshot after save
      // show a toast/snackbar or success message in real app
      alert('Profile saved!');
    }, 900);
  }
}
