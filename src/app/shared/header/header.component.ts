import { Component, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  scrollEvent = new EventEmitter<boolean>();
  customStyle: any;
  defaultStyle: any;


  updateStyle() {
    // Perform any logic to update the style dynamically
    // For example, changing the background color to yellow
    this.customStyle = {
      ...this.defaultStyle,
      width: '100%',
      background: '#317ece',
      padding: '0',
      position: 'fixed',
      top: '0',
      transition: "0.2s",
      // Add other updated styles as needed
    };
  }

  // Function to reset the style to the initial/default style
  resetStyle() {
    this.customStyle = { ...this.defaultStyle };
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    const isElementScrolled = this.isElementScrolled('main-navbar');
    this.scrollEvent.emit(isElementScrolled);
  }

  private isElementScrolled(elementId: string): boolean {
    const element = document.getElementById(elementId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (window.scrollY > rect.height) {
        this.updateStyle()
      } else {
        // element.style.all = "initial";
        this.resetStyle()
      }
      return rect.top < window.innerHeight && rect.bottom >= 0;
    }
    return false;
  }

  showMyAccount() {
    const myAccountDropdown = document.getElementById('myAccountDropdown') as HTMLElement;
    myAccountDropdown.style.display = myAccountDropdown.style.display == 'block' ? 'none' : 'block';
    myAccountDropdown.style.transitionDuration = '3s'
  }
  allCategory() {
    const targetDiv = document.getElementById('allCategory-items') as HTMLElement;
    targetDiv.style.top = "66px"
    targetDiv.style.transform = targetDiv.style.transform == 'scaleY(0)' ? targetDiv.style.transform = 'scaleY(1)' : targetDiv.style.transform = 'scaleY(0)';
  }
}
