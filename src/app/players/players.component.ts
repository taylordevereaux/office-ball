import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Player } from '../_models/player';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  public players: Array<Player> = [];
  public isAdding = false;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ''
    });
  }

  ngOnInit() {
    this.players.push({
      name: 'Taylor',
      score: 0
    }, {
      name: 'Yannick',
      score: 0
    });
  }

    addPlayer() {
      this.isAdding = true;
    }

    submitPlayer() {
      this.players.push({
        ...this.form.value,
        score: 0
      } as Player);
      this.cancelPlayer();
    }

    cancelPlayer() {
      this.form.reset();
      this.isAdding = false;
    }
}
