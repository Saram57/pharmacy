import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements AfterViewInit {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // ---------- HERO SLIDER ----------
    const slides = document.querySelectorAll('.hero-slide');
    let current = 0;

    if (slides.length) {
      slides[current].classList.add('active');
      setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
      }, 5000);
    }

    // ---------- SIDEBAR FUNCTIONALITY ----------
    const hamburger = document.querySelector('.hamburger') as HTMLElement;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const closeSidebarBtn = document.querySelector('.close-sidebar') as HTMLElement;
    const overlay = document.querySelector('.overlay') as HTMLElement;

    const openSidebar = () => {
      sidebar?.classList.add('active');
      overlay?.classList.add('active');
      sidebar?.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
      sidebar?.classList.remove('active');
      overlay?.classList.remove('active');
      sidebar?.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    };

    hamburger?.addEventListener('click', openSidebar);
    hamburger?.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') openSidebar();
    });
    closeSidebarBtn?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSidebar();
    });

    // ---- VIDEO MODAL FUNCTIONALITY ----
    const watchDemoBtn = document.querySelector('.btn-outline') as HTMLElement;
    const videoModal = document.getElementById('videoModal') as HTMLElement;
    const closeVideoBtn = document.querySelector('.close-video') as HTMLElement;
    const demoVideoPlayer = document.getElementById('demoVideo') as HTMLVideoElement;

    const videoURL = 'assets/my-local-video.mp4';

    watchDemoBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      videoModal?.classList.add('active');

      if (demoVideoPlayer) {
        demoVideoPlayer.src = videoURL;
        demoVideoPlayer.load();
        demoVideoPlayer.play();
      }
    });

    const closeAndResetVideo = () => {
      videoModal?.classList.remove('active');
      if (demoVideoPlayer) {
        demoVideoPlayer.pause();
        demoVideoPlayer.currentTime = 0;
      }
    };

    closeVideoBtn?.addEventListener('click', closeAndResetVideo);
    videoModal?.addEventListener('click', (e) => {
      if (e.target === videoModal) closeAndResetVideo();
    });
  }
}
