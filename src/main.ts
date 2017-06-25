import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Root module
import { AppModule } from './app/app.module';

// Enable prod mode or add debugging modules
if (process.env.ENV === 'production') {
  enableProdMode();
}

// Bootstrap app!
export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

// Wait till DOM is ready...
if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}
