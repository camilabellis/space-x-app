import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { combineLatest, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { SpaceXService } from 'src/app/services/spacex/spacex.service';

interface IRocketDetail {
  flight_number: number;
  mission_name: string;
  launch_date_unix: number;
  description: string;
  rocket: {
    rocket_id: string;
    rocket_name: string;
    active: boolean;
    cost_per_launch: number;
    company: string;
  },
}

@Component({
  selector: 'rocket-detail',
  templateUrl: './rocket-detail.component.html',
  styleUrls: ['./rocket-detail.component.scss'],
})
export class RocketDetailComponent implements OnDestroy, OnInit {
  public rocketDetail: IRocketDetail | undefined;

  private onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private spaceXService: SpaceXService,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    const rocketId = this.route.snapshot.params.id;
    console.log(rocketId);
    this.getRocketDetails(rocketId);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  private getRocketDetails(rocketId: string): void {
    combineLatest(this.spaceXService.getDetails(), this.spaceXService.getLauches())
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe(([rocketDetails, launchDetails]) => {
        const selectedRocket = rocketDetails.find((rocket: any) => rocket.rocket_id === rocketId);
        const selectedLaunch = launchDetails.find((launch: any) => launch.rocket.rocket_id === rocketId);

        this.rocketDetail = {
          flight_number: selectedLaunch.flight_number,
          mission_name: selectedLaunch.mission_name,
          launch_date_unix: selectedLaunch.launch_date_unix,
          description: selectedLaunch.description,
          rocket: {
            rocket_id: selectedRocket.rocket_id,
            rocket_name: selectedRocket.rocket_name,
            active: selectedRocket.active,
            cost_per_launch: selectedRocket.cost_per_launch,
            company: selectedRocket.company,
          }
        }

        console.log(this.rocketDetail);
      })
  }
}