import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Output() onFormGroupChange = new EventEmitter<any>() 
  
  options: FormGroup;
  allSeasons: boolean = true
  allGameTypes: boolean = true

  seasonList = [
    'season01','season02','season03','season04','season05','season06','season07','season08','season09','season10',
    'season11','season12','season13','season14','season15','season16','season17','season18','season19','season20',
    'season21','season22','season23','season24','season25','season26','season27','season28','season29','season30',
    'season31','season32','season33','season34','season35','season36','season37','season38', 
    'goattournament','superjeopardy','trebekpilots'
  ]
  gameTypeList = ['regular','college','power','senior','teacher','teen','ToC']

  allSeasonsChecked = [
  {
    season01: false,
    season02: false,
    season03: false,
    season04: false,
    season05: false,
    season06: false,
    season07: false,
    season08: false,
    season09: false,
    season10: false,
    season11: false,
    season12: false,
    season13: false,
    season14: false,
    season15: false,
    season16: false,
    season17: false,
    season18: false,
    season19: false,
    season20: false,
    season21: false,
    season22: false,
    season23: false,
    season24: false,
    season25: false,
    season26: false,
    season27: false,
    season28: false,
    season29: false,
    season30: false,
    season31: false,
    season32: false,
    season33: false,
    season34: false,
    season35: false,
    season36: false,
    season37: false,
    season38: false,
    goattournament: false,
    superjeopardy: false,
    trebekpilots: false,
  },
  {
    season01: true,
    season02: true,
    season03: true,
    season04: true,
    season05: true,
    season06: true,
    season07: true,
    season08: true,
    season09: true,
    season10: true,
    season11: true,
    season12: true,
    season13: true,
    season14: true,
    season15: true,
    season16: true,
    season17: true,
    season18: true,
    season19: true,
    season20: true,
    season21: true,
    season22: true,
    season23: true,
    season24: true,
    season25: true,
    season26: true,
    season27: true,
    season28: true,
    season29: true,
    season30: true,
    season31: true,
    season32: true,
    season33: true,
    season34: true,
    season35: true,
    season36: true,
    season37: true,
    season38: true,
    goattournament: true,
    superjeopardy: true,
     trebekpilots: true,
  },
  ]

  allGameTypesChecked = [
    {
      regular:  false,
      college:  false,
      power:    false,
      senior:   false,
      teacher:  false,
      teen:     false,
      ToC:      false,
    },
    {
      regular:  true,
      college:  true,
      power:    true,
      senior:   true,
      teacher:  true,
      teen:     true,
      ToC:      true,
    }
  ]

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      season01: true,
      season02: true,
      season03: true,
      season04: true,
      season05: true,
      season06: true,
      season07: true,
      season08: true,
      season09: true,
      season10: true,
      season11: true,
      season12: true,
      season13: true,
      season14: true,
      season15: true,
      season16: true,
      season17: true,
      season18: true,
      season19: true,
      season20: true,
      season21: true,
      season22: true,
      season23: true,
      season24: true,
      season25: true,
      season26: true,
      season27: true,
      season28: true,
      season29: true,
      season30: true,
      season31: true,
      season32: true,
      season33: true,
      season34: true,
      season35: true,
      season36: true,
      season37: true,
      season38: true,
      goattournament: true,
      superjeopardy: true,
      trebekpilots: true,
      regular:  true,
      college:  true,
      power:    true,
      senior:   true,
      teacher:  true,
      teen:     true,
      ToC:      true,
      jeopardy:       true,
      doubleJeopardy: true,
    })
   }

  ngOnInit(): void {
    this.options.valueChanges.subscribe(() => this.onFormGroupChange.emit(this.options))
  }

  setAllSeasons(checked: boolean) {
    if(checked){
      this.options.patchValue(this.allSeasonsChecked[1])
    } else {
      this.options.patchValue(this.allSeasonsChecked[0])
    }
  }

  setAllGameTypes(checked: boolean) {
    if(checked){
      this.options.patchValue(this.allGameTypesChecked[1])
    } else {
      this.options.patchValue(this.allGameTypesChecked[0])
    }
  }

  checkAllSeasons() {
    this.allSeasons = true
    this.seasonList.forEach((season) => {
      if(!this.options['value'][season]){
        this.allSeasons = false
      }
    })
  }

  checkAllGameTypes() {
    this.allGameTypes = true
    this.gameTypeList.forEach((gameType) => {
      if(!this.options['value'][gameType]){
        this.allGameTypes = false
      }
    })
  }
}
