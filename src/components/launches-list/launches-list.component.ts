import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SpaceXService } from 'src/app/services/spacex/spacex.service';

@Component({
  selector: 'launches-list',
  templateUrl: './launches-list.component.html',
  styleUrls: ['./launches-list.component.scss'],
})
export class LaunchesListComponent implements OnDestroy {
  public launches = [];

  private onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private spaceXService: SpaceXService,
  ) {
    this.getLaunches();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  public getLaunches(): void {
    this.spaceXService.getLauches()
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe(launches => this.launches = launches);
  }
}