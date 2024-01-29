import { Component, EventEmitter, HostListener } from '@angular/core';

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
      console.log(rect.height);
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
    myAccountDropdown.style.display = myAccountDropdown.style.display == 'block' ? 'none' : 'block'
  }
  allCategory() {
    const targetDiv = document.getElementById('allCategory-items') as HTMLElement;
    if (targetDiv.style.transform == 'scaleY(0)') {
      targetDiv.style.transform = 'scaleY(1)';
      targetDiv.style.top = "66px"
    } else {
      targetDiv.style.transform = 'scaleY(0)';
      targetDiv.style.top = "66px"

    }
  }
}
