import { Component, OnInit, Renderer2 } from '@angular/core';
import { without, find, isUndefined, isEqual, includes } from 'lodash';

import { HttpService } from './shared/http.service';
import { ISeat } from './shared/seat.interface';
import { IRow } from './shared/row.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public rows: any = [];

  private bookedSeats: Array<any> = [];
  private selectedRows: Array<any> = [];

  /**
   * @param {HttpService} httpService
   * @param {Renderer2} renderer
   */
  constructor( private httpService: HttpService, private renderer: Renderer2 ) {}

  public ngOnInit(): void {
    this.loadData();
  }

  /**
   * @param {any} event
   * @param {any} seat
   */
  public setInFocus(event: any, seat: ISeat) {
    if (seat.isBooked === 0) {
      if (event.target.localName === 'div') {
        if (event.target.className !== 'inFocus') {
          this.renderer.addClass(event.target, 'inFocus');
          this.bookedSeats.push(seat.id);
        } else {
          this.renderer.removeClass(event.target, 'inFocus');
          this.bookedSeats = without(this.bookedSeats, seat.id);
        }
      } else {
        if (event.target.parentElement.className !== 'inFocus') {
          this.renderer.addClass(event.target.parentElement, 'inFocus');
          this.bookedSeats.push(seat.id);
        } else {
          this.renderer.removeClass(event.target.parentElement, 'inFocus');
          this.bookedSeats = without(this.bookedSeats, seat.id);
        }
      }
    }
  }

  /**
   * save selected seats
   */
  public bookSeats(): void {
    for (let i = 0; i < this.bookedSeats.length; i++) {
      this.rows.forEach((row: IRow) => {
        const currentSeat: ISeat = find(row.seats, (seat) => {
          return seat.id === this.bookedSeats[i];
        });

        if (!isUndefined(currentSeat)) {
          row.seats.forEach((seat: ISeat) => {
            if (isEqual(seat, currentSeat)) {
              seat.isBooked = 1;
            }
          });
          if (!includes(this.selectedRows, row)) {
            this.selectedRows.push(row);
          }
        }
      });
    }

    this.selectedRows.forEach((row: IRow) => {
      this.httpService.update(row).subscribe((data: Response) => {
        this.loadData();
      });
    });
  }

  /**
   * load all the seats
   */
  public loadData(): void {
    this.bookedSeats = [];
    this.selectedRows = [];
    this.httpService.fetchAll().subscribe((data: Response) => {
      this.rows = data.json();
    });
  }
}
