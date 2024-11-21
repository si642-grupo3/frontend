import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WalletReportComponent} from "./reports/components/wallet-report/wallet-report.component";
import {PortfolioComponent} from "./reports/components/portfolio/portfolio.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WalletReportComponent, PortfolioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'finance-frontend';
}
