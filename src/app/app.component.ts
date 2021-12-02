import { Component, OnChanges, OnInit } from '@angular/core';
import * as data from '../assets/ddLocations.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  totalPerClue = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  cardColor = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','']
  percentage = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','']
  totalClues = 0
  checkedSeasons = []
  checkedGameTypes = []
  checkedRounds = []

  formCheck :any = ''
  
  title = 'jeopardy-daily-doubles';

  ngOnInit(){
    this.getPercentagesAndColors()
  }

  onFormGroupChangeEvent(_event) {
    this.formCheck = _event;
    const seasonList = [
      'season01','season02','season03','season04','season05','season06','season07','season08','season09','season10',
      'season11','season12','season13','season14','season15','season16','season17','season18','season19','season20',
      'season21','season22','season23','season24','season25','season26','season27','season28','season29','season30',
      'season31','season32','season33','season34','season35','season36','season37','season38', 
      'goattournament','superjeopardy','trebekpilots'
    ]
    const gameTypeList = ['regular','college','power','senior','teacher','teen','ToC']

    this.checkedSeasons = []
    this.checkedGameTypes = []
    seasonList.forEach((season) => {
      if(this.formCheck['value'][season]){
        if(season == 'goattournament' || season == 'superjeopardy' || season == 'trebekpilots'){
          this.checkedSeasons.push(season)
        }
        if(season.slice(-2,-1) == '0'){
          this.checkedSeasons.push(season.slice(-1))
        } else {
          this.checkedSeasons.push(season.slice(-2))
        }
      }
    })
    gameTypeList.forEach((gameType) => {
      if(this.formCheck['value'][gameType]){
        this.checkedGameTypes.push(gameType)
      }
      if(this.formCheck['value']['goattournament']){
        this.checkedGameTypes.push('goat')
      }
      if(this.formCheck['value']['superjeopardy']){
        this.checkedGameTypes.push('super')
      }
    })

    this.getPercentagesAndColors()
  }

  getPercentagesAndColors() {
    this.totalPerClue = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.cardColor = ['','','','','','','','','','','','','','','','','','','','','','','','','','','','','','']
    this.totalClues = 0
    let jNotFound = 0
    let djNotFound = 0
    let gameTypes = []

    data['ddLocations'].forEach((game) => {
      if(gameTypes.indexOf(game.gameType) == -1){
        gameTypes.push(game.gameType)
      }
      if(game.jCol != 0 && this.isGameValid(game, 'jeopardy')) {
        this.totalPerClue[(game.jRow - 1) * 6 + game.jCol - 1] += 1
      } else if(this.isGameValid(game, 'jeopardy')) { jNotFound++ }
      if(game.dj1Col != 0 && this.isGameValid(game, 'doubleJeopardy')) {
        this.totalPerClue[(game.dj1Row - 1) * 6 + game.dj1Col - 1] += 1
      } else if(this.isGameValid(game, 'doubleJeopardy')) { djNotFound++ }
      if(game.dj2Col != 0 && this.isGameValid(game, 'doubleJeopardy')) {
        this.totalPerClue[(game.dj2Row - 1) * 6 + game.dj2Col - 1] += 1
      } else if(this.isGameValid(game, 'doubleJeopardy')) { djNotFound++ }
    })
    console.log(gameTypes)
    this.totalPerClue.forEach((clueCard) =>{
      this.totalClues += clueCard
    })
    let maxCardNumber = Math.max(...this.totalPerClue)
    for(let i=0; i < this.totalPerClue.length ; i++) {
      if(maxCardNumber == 0) {
        this.percentage[i] = '0.00'
        this.cardColor[i] = '#060CE9'
      } else {
        this.percentage[i] = (this.totalPerClue[i] * 100 / this.totalClues).toFixed(2)
      this.cardColor[i] = this.mixColors(this.totalPerClue[i]/maxCardNumber)
      }
    }
  }

  mixColors(percentage) {
    let c1_diff = 249,
    c2_diff = -12,
    c3_diff = -233,
    c1_new = Math.round(c1_diff * percentage + 6).toString(16),
    c2_new = Math.round(c2_diff * percentage + 12).toString(16),
    c3_new = Math.round(c3_diff * percentage + 233).toString(16)
    if(c1_new.length == 1) {
      c1_new = '0' + c1_new
    }
    if(c2_new.length == 1) {
      c2_new = '0' + c2_new
    }
    if(c3_new.length == 1) {
      c3_new = '0' + c3_new
    }

    return '#' + c1_new + c2_new + c3_new

  }

  isGameValid(game, round) {
    if(this.formCheck['value'] === undefined){
      return true;
    } else if(
          this.checkedSeasons.indexOf(game.season.toString()) > -1 &&
          this.checkedGameTypes.indexOf(game.gameType) > -1 &&
          this.formCheck['value'][round]
      ){
      return true
    }
    return false

  }
}
