import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ContactMethod {
  icon: string;
  label: string;
  value: string;
  link?: string;
  color: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitted = false;
  showSuccessMessage = false;

  contactMethods: ContactMethod[] = [
    {
      icon: 'phone',
      label: 'Téléphone',
      value: '+243821355601',
      link: 'tel:+243821355601',
      color: 'text-green-500'
    },
    {
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: '+243821355601',
      link: 'https://wa.me/243821355601',
      color: 'text-green-600'
    },
    {
      icon: 'facebook',
      label: 'Facebook',
      value: 'Mon profil Facebook',
      link: 'https://www.facebook.com/votre-profil', // Remplacez par votre URL Facebook
      color: 'text-blue-600'
    },
    {
      icon: 'mail',
      label: 'Email',
      value: 'emmanueldeko64@gmail.com',
      link: 'mailto:emmanueldeko64@gmail.com',
      color: 'text-blue-500'
    },
    {
      icon: 'location_on',
      label: 'Adresse',
      value: 'Kinshasa, République démocratique du Congo',
      color: 'text-red-500'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.showSuccessMessage = true;
      this.contactForm.reset();
      this.isSubmitted = false;

      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 5000);
    }
  }

  get formControls() {
    return this.contactForm.controls;
  }

  getErrorMessage(control: string): string {
    const ctrl = this.formControls[control as keyof typeof this.formControls];
    
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (ctrl.hasError('email')) {
      return 'Veuillez entrer une adresse email valide';
    }
    if (ctrl.hasError('minlength')) {
      return `Ce champ doit contenir au moins ${ctrl.errors?.['minlength'].requiredLength} caractères`;
    }
    return '';
  }
}