import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';

declare var data : any;

@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, AfterViewInit {
	public portfolioData = data['Portfolio'];
	public navTabs = [{
		id: "web",
		name: "WEB",
		placement: "top"
	}, {
		id: "mobile",
		name: "MOBILE",
		placement: "bottom"
	}, {
		id: "ai",
		name: "AI",
		placement: "bottom"
	},
	{
		id: "blockchain",
		name: "BLOCKCHAIN",
		placement: "top"
	}];
	public activeTab = "web";
	public selector : any;

	public activeElements : any = {};


	constructor(private changeDetectorRef: ChangeDetectorRef) {
		changeDetectorRef.detach();
	}

	ngOnInit(): void {
		this.changeDetectorRef.detectChanges();
	}
	ngAfterViewInit() {
		for(const tab of this.navTabs){
			if(!this.activeElements[tab.id]){
				this.activeElements[tab.id] = document.getElementById(tab.id+'-tab')!!;
			}
			console.log(tab);
			this.activeElements[tab.id].addEventListener('click',(event : any) => event.preventDefault());
		}

		this.changeActiveTab(this.activeTab);
	}

	@HostListener('window:resize', ['$event'])
	onWindowResize() {
		this.updateSelector(this.activeTab);
	}

	public changeActiveTab(tab : string) {
		this.updateSelector(tab);
		this.activeTab = tab;
		this.changeDetectorRef.detectChanges();
	}

	public updateSelector(tab : string) {
		if(!this.selector){
			this.selector = document.getElementById('pt-selector');
		}
		console.log(tab, this.activeElements[tab].offsetWidth)
		this.selector.style.width = `${this.activeElements[tab].offsetWidth}px`;
		this.selector.style.left = `${this.activeElements[tab].offsetLeft}px`;
	}
}
