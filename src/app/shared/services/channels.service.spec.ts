import { TestBed } from '@angular/core/testing';
import { ChannelsService } from './channels.service';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from 'src/app/constants/config';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ChannelService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [],
      providers: [ChannelsService, Configuration]
    })
  );

  it('should be created', () => {
    const service: ChannelsService = TestBed.get(ChannelsService);
    expect(service).toBeTruthy();
  });
});
