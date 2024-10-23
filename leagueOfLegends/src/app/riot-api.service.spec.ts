import { TestBed } from '@angular/core/testing';
import { RiotApiService } from './riot-api.service';
import axios from 'axios';

jest.mock('axios');

describe('RiotApiService', () => {
  let service: RiotApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiotApiService);
  });

  const mockRiotID = { gameName: 'PlayerName', tagLine: 'NA1' };
  const mockPUUID = 'sample-puuid-12345';
  const mockSummonerData = {
    id: 'sample-id',
    accountId: 'sample-account-id',
    puuid: mockPUUID,
    name: 'PlayerName',
    profileIconId: 1234,
    summonerLevel: 100,
  };

  it('should fetch PUUID by Riot ID', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { puuid: mockPUUID } });

    const puuid = await service.getPUUIDByRiotID(mockRiotID.gameName, mockRiotID.tagLine);
    
    expect(puuid).toBe(mockPUUID);
    expect(axios.get).toHaveBeenCalledWith(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${mockRiotID.gameName}/${mockRiotID.tagLine}`,
      { headers: { 'X-Riot-Token': expect.any(String) } }
    );
  });
});
