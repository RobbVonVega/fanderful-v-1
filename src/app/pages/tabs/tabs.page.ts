import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {}

  disIcon = '../../../assets/tab-icons/1-D.svg';
  clickedDisIcon = '../../../assets/tab-icons/1-D-s.svg';

  searchIcon = '../../../assets/tab-icons/2-S.svg';
  clickedSearchIcon = '../../../assets/tab-icons/2-S-s.svg';

  rankIcon = '../../../assets/tab-icons/3-R.svg';
  clickedRankIcon = '../../../assets/tab-icons/3-R-s.svg';

  inboxIcon = '../../../assets/tab-icons/4-I.svg';
  clickedInboxIcon = '../../../assets/tab-icons/4-I-s.svg';
  
  playlistsIcon = '../../../assets/tab-icons/5-P.svg';
  clickedPlaylistsIcon = '../../../assets/tab-icons/5-P-s.svg';

  isDisSelected = true;
  isSearchSelected = false;
  isRankSelected = false;
  isInboxSelected = false;
  isPlaylistsSelected = false;

  changeDisIcon() {
    // this.isSearchSelected = !this.isSearchSelected;
    this.resetAll();
    this.isDisSelected = true;
  }

  changeSearchIcon() {
    // this.isDisSelected = !this.isDisSelected;
    this.resetAll();
    this.isSearchSelected = true;
  }

  changeRankIcon() {
    // this.isDisSelected = !this.isDisSelected;
    this.resetAll();
    this.isRankSelected = true;
  }

  changeInboxIcon() {
    // this.isDisSelected = !this.isDisSelected;
    this.resetAll();
    this.isInboxSelected = true;
  }

  changePlaylistsIcon() {
    // this.isDisSelected = !this.isDisSelected;
    this.resetAll();
    this.isPlaylistsSelected = true;
  }

  resetAll(){
    this.isDisSelected = false;
    this.isSearchSelected = false;
    this.isRankSelected = false;
    this.isInboxSelected = false;
    this.isPlaylistsSelected = false;
  }

}
