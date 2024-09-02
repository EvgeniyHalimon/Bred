import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from '../comment.service';
import Comment from '../comment.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let mockCommentsModel: {
    findOne: jest.Mock;
    findAndCountAll: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    set: jest.Mock;
    destroy: jest.Mock;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getModelToken(Comment),
          useValue: {
            findAndCountAll: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            set: jest.fn(),
            create: jest.fn(),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
    mockCommentsModel = module.get(getModelToken(Comment));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(commentsService).toBeDefined();
  });
  const comment = {
    id: 'd561e01f-fdc4-4a3f-8ea2-af7ff9db6ed9',
    text: 'cool',
    articleId: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
    authorId: 'd0601328-1486-434a-860e-75b843a682db',
    updatedAt: '2024-09-02T12:09:07.258Z',
    createdAt: '2024-09-02T12:09:07.258Z',
  };

  describe('CommentsService create method', () => {});

  describe('CommentsService patch method', () => {
    const updateCommentDto = {
      text: 'TEST',
    };
    const updateComment = {
      userId: 'd0601328-1486-434a-860e-75b843a682db',
      commentId: 'd561e01f-fdc4-4a3f-8ea2-af7ff9db6ed9',
      updateCommentDto,
    };

    it('should successfully patch a comment', async () => {
      mockCommentsModel.findOne.mockResolvedValue({
        save: mockCommentsModel.save.mockResolvedValue(comment),
        set: mockCommentsModel.set,
      });

      const result = await commentsService.patch(updateComment);

      expect(mockCommentsModel.findOne).toHaveBeenCalledTimes(2);
      expect(mockCommentsModel.set).toHaveBeenCalledWith(updateCommentDto);
      expect(mockCommentsModel.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(comment);
    });

    it('should throw NotFoundException if comment not found', async () => {
      mockCommentsModel.findOne.mockResolvedValue(null);
      try {
        await commentsService.patch(updateComment);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Comment not found');
      }
    });

    it('should throw NotFoundException if user are not author of this comment', async () => {
      mockCommentsModel.findOne.mockResolvedValueOnce(updateComment);
      mockCommentsModel.findOne.mockResolvedValueOnce(null);
      try {
        await commentsService.patch(updateComment);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('You are not author of this comment');
      }
    });
  });

  describe('CommentsService delete method', () => {
    it('should succesfully delete a comment', async () => {
      mockCommentsModel.findOne.mockResolvedValue(comment);
      await commentsService.delete({
        userId: '1',
        commentId: '11',
      });
      expect(mockCommentsModel.destroy).toHaveBeenCalledWith({
        where: { id: '11' },
      });
    });

    it('should throw NotFoundException if comment not found', async () => {
      mockCommentsModel.findOne.mockResolvedValue(null);
      try {
        await commentsService.delete({
          userId: '1',
          commentId: '11',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Comment not found');
      }
    });

    it('should throw NotFoundException if user are not author of this comment', async () => {
      mockCommentsModel.findOne.mockResolvedValueOnce(comment);
      mockCommentsModel.findOne.mockResolvedValueOnce(null);
      try {
        await commentsService.delete({
          userId: '1',
          commentId: '11',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('You are not author of this comment');
      }
    });

    it('should throw BadRequestException if comment not found', async () => {
      mockCommentsModel.findOne.mockResolvedValue(comment);
      try {
        await commentsService.delete({
          userId: '1',
          commentId: '11',
        });
        mockCommentsModel.destroy.mockResolvedValue(0);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(
          'Something went wrong while deleting the comment',
        );
      }
    });
  });

  describe('CommentsService findAll method', () => {
    it('should return comments and count', async () => {
      const result = {
        rows: [
          {
            id: 'd561e01f-fdc4-4a3f-8ea2-af7ff9db6ed9',
            authorId: 'd0601328-1486-434a-860e-75b843a682db',
            articleId: '6660ff57-3c9e-4dd0-b4ca-a5cc098b514f',
            text: 'cool',
            createdAt: '2024-09-02T12:09:07.000Z',
            updatedAt: '2024-09-02T12:09:07.000Z',
            author: {
              id: 'd0601328-1486-434a-860e-75b843a682db',
              firstName: 'string',
              lastName: 'string',
              email: 'q@email.com',
              bio: 'Hello my name is Monti',
              role: 'user',
              photo:
                '_9j_4AAQSkZJRgABAQAAAQABAAD_2wCEAAoHCBUVFRgSFRUYGBgaGBoYGRoZGBgcGRgcHBgcHBkYGRgcIy4lHB4rHxkZJjgnKy8xNTU1HCQ7QDs0Py40NTEBDAwMEA8QHhISHjQrISs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP_AABEIALcBEwMBIgACEQEDEQH_xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj_xAA7EAABAwIEBAMHAgUEAgMAAAABAAIRAyEEEjFBBVFhcSKBkQYTMqGxwfAUQlJictHhI4KS8QfSFTOi_8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF_8QAIREBAQACAgMBAQADAAAAAAAAAAECESExAxJBUWETIjL_2gAMAwEAAhEDEQA_AKQTgmhPC85BpSJxTCmoqVNCcEJCEJEj0VOCYlBQRyEkpEECkSoDUH6hEJ-Qi6lY1t78x8v8qpjaNKyFYfRgjqmOZYHndFxsCNKEgCcFIBTS1SAILUBCWppap8qQsQekGVLClyIyJkihEKQtSQgGwlRCEAoT0xOCAISoQUgEJsoQCBLKalQCkppQUIASpqUIBUIQhQQhLCC0UJwamgJalfKIF423HQj7q8cLlRolewkajUfcKu3H_Fa30I19Fl4nGuD4DpbIcNpBggd4Vlj2klp3yHuJa4ecEhdGPik7VpZrcVHwj9p9Z_7CpsxBbEm2Y5r_ANIA-RUGGwbnHObQJ6Ag3-Y-SR9AubYEQYE7RqTzMkj15LSYydHpqYCu57XPmBEDpJMn7K1g5e7-UWHWOfRZZD2MDREXja3MnYT9CrGFquaIm5F4_PwIuMpNn3Gwud-irVGQYUH_AMiQPdtku3P5p3VjD1mvEEi3LQnkDusM_F-FogShSPp7yPJMlYWaVMSwmpUiSvQEJAlKbKCuJSEwhOlNJTRYYUBBSILRUqbKWUGempEqEhCEIBqEISOwIhCJQNCEIlJKDkKnJoT2oVoQnsYgkNGZxgDdc9jfaN8lrGtABOsyRpzWuHjuRabmOqjKWtInYi4nqNgsih73OHHsb6QefLkeVlQw2Oa4yZaTrtfmCNPMf463hvCaj25oBBgjkbX02NvRdUkxhyMQ8PH_ANhPhIIPNvigekx5DmpMI3x5T_K3pcC8_wBTPmVsN4bUBLMpLST3AcPpYeY8088HeG77jrEyPzqnuHpiOxjmtdaxGYD_AGy5p_3SE_EVXF8AwLCd-UDrv6K3V4eXWy32Ebbj1lLU4S5rpNznzDoIBE8xLfmjY0rPM2i5Ayg_tbFpHQev1gFMFxAa43vvA68zuevRX6lB4l2Xw3M-Vh6n6LOxFQmYzwPJk-t0bLS57m3iyxyzQ0f1Rc_IKVjtAyIG4aGsH-46qnhqBe4NcRrMXLvQC1grlYiPDEdYGncphKzEXyzPWfoDspXNIWdgjUa6WtEHU2J9bla1YlwzH6g_Rc_lw-qnCGU2U3MklczTZ8ppKE0oTRKQlBSIRQhKhNFJCWE6EsIBiVLCIQCITsqEBGiEFCF6BSQlQAkNCEQgoQqQBOakAU9JvUDuiTZVQ485_wCme0fymxGzgTbyXIMw2dsh3i3H37Lq-I4imSWFzCIuJMecCVh4XCvzn3QD8smJgwBJgGCYC7sJrHSWPVY9h8TY2kXHqN16j_4z4hnoOpEzkcY7OEiPOfVcUcK95I90YtmLSHMg75R31Xc-w3sw_DPdULjkddo5AmwJGtoTypyO3bhA4gxeFK_BiNFaos0Uz22KjZuR4lgAw5wPT6_P5JuHpMfFpNpP50W7xjC529Cl4bgAxgEfm_3T2GVj-GtcxzAI27Bea1MFXzubZrQSBMi2wJFz2C9qqUREBeYe3Nc0HuJhojwglrc55Ses_VPEq5HiOLczEMoMdOUtLyNA5x8Q12bHqV0OFqMdZzT_AFZWkac5JXIez7GguqPBJJs7KHNneTput7wN8THsmf2tcfWNFRLmLoz4Wh0dsvqSFPgtMsQRz_umFudocNY638nGVQoPa18PJHKQPlBU5TcNrPpxqR5GU0FK9g1aSR2hNC4cpqmekhIE5IGEJIUhTXJiw0FOCYUAoRYkCcopTw5BaKlTZSoVosoTUIGjIS5U4BPDU2liPKlDVLlSQkSPKlyp4SEoVIaAkxL2sb4i4dhP0CVU8ZUMjxv7Nt6uJAHzWvim8iyUcXlLS4MOmpZG2tlDwLh9Z7s9NhJ57eXkrL2B13D1e5xI9IH0Xd-yFRjGBoZ5gLptR8ZHCODVqL2ve2xhp1iNhbsF3-EaB2UVWuHFoAIHbVXhRlsxBUZbPEV8UymMziAOfJNwfFqNQ-B7HdiDquB_8jisKRaCCDawuOpMrg-Amox2Zgcx4gRMk2Eu00nbtcp4w6-hqzA5sBI2IHZZ_s9Uc7Dsz_EGgH0Wf7ZvqswxfRJDhuNQIN04Va7MQ1xMEHZcr_5B4Myvh3PIGZgLhp537LgvZbj76eJLH1XP0BEGA4GHDSdZ0kL1LGYltSmWg_ENjz5o6o1uPDuHUn6sg5TAEjMN7AkT6rZfSY4y_M2f4gB5WlQ18KGVHgA2Jk_YthaGGrA2z5ZtDxY-oH17LRKB1JrDIIcNbG3zb9017gYdl8o19Fp4ug3JcMnSWZSPqCFjDEFnhERzP_tskcbrHeEWMRsmBRYGo5zNSIU5cTqubzY6uzCcFHKe0rASlKSEqElRE8JE9wTIQnKBKEITKFBT5UaVMU5CEJFs9oTwEjQllNqCkRKJSBCkISoQcNa1Z_EaDSZjLH7nbdhoPNaSxuKiHABsuPOT8m6DqTC28N5TkgFem1wAaXfzEj7CfVei-z2KYWAmPsvKS4B0uv8AIeg-q3eEcTLfAMxG5I0-cBdFTHrWFrBzokbFajYjVcLwziuhzTFjB08wukZxJpFiJCnsXhY4hw5tUQ_RY2D9lqTKhqNYAe1-hutqlxFh3Hr9lH-vaHET-d9inIN1ZacgI0t-FV3VswdTLpn4baSqT8aX5wCTDc0T4rbAHfX5KKrjGR1HrpKW22PiuUc9S9kGMxRqs8I-KIEX-KLarq6-FZkEgmNIkX7hU6OODn5iYhpm-l4v1skxfE2hhMSDbT-2irTC29OC4rgn0qrnMeXAkmHS519rTz3VFtJou6mQf5ob0mBB-qvV8YC8uykAbg7fdAoZzLQC2Ncs_S8eqoGVS0sOWOkkT6iAfQLHDGOJGbym3kYt2K0H08lswadrEtPSSNemqpvqtDrtF7W0KBGpwrwNLXaaSpmkSbz0KgwrA0Sy4I-Em8cgUop-ORvcbFRnNw1ksHP7oASF3MIBXHSPSFCVJUMSFOKjJQKEiEIKQsIQkQVPQkhKhJ8oJSIQ0lEp4KYU4IUWE6E1qcCkDYWdxWnmGv18vz6LUTXtBTwy9bsry4zEMDW5jcxABP2mPLxKkzEPJvZu0mB5NF_QLd4_hSAajLH832XH1Heu55rtxymU2jp2OA4p7sZWnMSLuIiOw591vYbihjLmAcL9QT-3v9-y86wWMymSLNuSbmdB84srLMdJm-_qdydzv5JWK29KwGNZVlr3lhGpBIJHee2iTFVBh_FSqGTqHQ4RpJnf82C8-qYx7SBmuBLjuXde2n_LmnUca57xmcYtPpp5k_NLmB0fEONYiM4ezNtALXdQYMH0VChxjEOBDiGydRr2_wArNq4kGA29p7kuiT1Nj5qv-qJaR5j5SPT6Ja3VzyZSalda3jL6bYBEObFzfkZPc_NUcTxJ5YfG5paPhv4f5xGoP5bTnqmKlhBN5bH_AO5-vyCbUxD3hmXWwB5uk-CdiYkdZ6RpGVa-C4mHGHkydHCxPXNo70nqtTK2AQ5kxIdlLf8AkWwSuf4cZEObIPIT1nLGvT0Wi_DsgeIQbh7WiB0e0QR81RLznv0eAbWuTPOCfiCz3NBdmbOXccjtMeame5zGmMpG42_wPQid96vCqRdUOUkCQYOnYpU43mNAphwBjUxqO2yTDHMR4rTqLeRB0Ku1MLAyjwki4OnksvDVC18y03EiYPLzCR_G1UomBI81WIhTVXRf5Ks58rkz7RKcEFNa5KoaSkJTCnFIUC0gSwkCkCCNASwnAJS1BWGoRlQgHMpuuCII1BkR5G_mkaJ0v2_uuJ497QPe8ta4GllAaC0yLTMm4cCSJB2m6tcB4tXoTUDziKbgPeNklzCYvB8VraWO8Lovinw466EBAxrKsPa7OXaZWxJGoOkPAiQQCpquHcyM4y5tMxAntKyyxs-K2YklJHb1E-nLqpsNRz30beXQYEaqNUqilISp6mHN3M8bf4gDlEa37ow-Fc_SN9xOk6TMdUtEo4hmZpEaheccTwxpvLT3Xp1emQS0ggiQRuCNVyHtbgQGioNQb9itvDdXR5Thyma0dZP2-_qpKb7juq7kMcuvSNrorkmSddfO5UjcQWg8zIHTYn0keZ5KklBS0e2hRxdnA_wj5Ob9pTamKknuqYP9vkmlyNQbTOeT6p7XgNaCLS7N1BygeYIJVcFSZpTJs4TET4IDiTaSbkbB0gyeU8jda-ExBc45rO0c14vPcj4tNddddcnCsbk8JExcGL8rHXv3Un6q-Zx8QG-477-aAt16hz5B2I762mR2Wtw-iWifLr0XO4euHVG6xIF7x26dF0TMUBpzNj0N2npopqsV-viyQGk3gdj2nfosUPzVLjK8GQQdehB1TMZiGvkCRFjF7c46KKlXPw1IMaO3jnKcFdUx8s0uNVXJTsNXLRGYOGx6JtWoT2XL5ZNoNlIXpMySVkcPzJEiVMwFI0qNK1AiUFPBSMYlypK0ahOyoQTkB7Kw7M5xLM0SGyI5EAyDNo-ap1uFvovc-ldsaMIzNB5ZgSfr6Lug7M0scNYmN4u2fQKrVwoIkZg2b6giNQRbqtv8mX10emNYvAuIEuJa8OfAJa-llLsujS9rjreDlMSdN9TGcceGFoa-mPCclVpeyZmQ5rXCBfWFzntFw98e9D82UxMQ4XsZ-LSDfvKzW8axIbl94SJmSATrOpGllrOZuM8tS8uvqlzGHFNxlN72ySywYW7ta6ZD4005QJTOGcXpVIdmLXWILZGUgyWuaBlgmO832XKe8dXdlr1HQZ8UDK15IguAAtt5qqypUw9QggSLOabtcPvbdHr8-lb9-PUKeMcwD3rGVRIPvAYdB1LgNHRaxAOUCFLS47SNRrSzI3bJGciDdpEeOYtN59cGg7PTa9mhbnbPxR-5kidDHldQfpHl4cxpc4APF7jI9rsxAkkRIPLMDtCnUqbNPQ3YmjUBe5rmOccjXPAY5xN42uRqdxuuV9rMO1lN7WtLmhkS0F0k2BPc91ZrvBYahfnDiHODRBAJnNYwWg9B5GybRrvp0vd0CxzHNOVznQ9h3Aa74rXiTpIS1CnDzDFcFr02Co9mVp-GSL9oKzQvVce5tSm5takGtcfGC4-Aho_1KbyYE8rzoVzHGeBYWmSaNVz5bIY7KXX0MiLR5rWZ_o9fxyYepGuRVw5aYF1GBBurSlJTC5dTguABzAToY-YWHxbhrqD8rtDcdv7qMc8bdHZYqMdopqTRKrsV6gJBMTvbX-6skxflEDfkq-cxqtrgOEbVDnOGhhaNXgjCCAsr5JLqnpg8PIgjsVqVK5LuupjrafVQV-GOpkECZCbRcR4uVvJ14Vyy8w1yk7xSRBZrFirxDDZ7bEWeP2jYx9VRw9cB0kiZ12LTYg9lo4hjWWN2uuDOk79lQXcJTysDTtoRyTyEmAeMnOLXN1KX9AFyeT_oqiKITikWaQE4BATgUlQoYnsYkaU9qWzSNQShIUxaSUqbKEFtUY12ZuR4uIlzXTyLsxdBEmflZT1X1RmD2Ay4Aua-TIt8BA5ONidVD75wb4S5syDBBga6ixt9E6k8lhGcOBh2a21oabjfleFpp02qT67IJl4cB4gWloy8zPeLE6qEYKjlnKxwk-pvFloiuB4fiG7cxIP-0jL11hVK7GF0tphhMZfCzQRBa5jiIA5eaqJu0uGazKWgBvhFst331mw09YCq8T4cyq0tyzyI1aYsfzVLUwRJztzAnWCTPXxSD3Vh7K7DlcGOEDQFhI87c0r3uKl-VxFTE16M0c_haYA2E3kb7_UKzwnjjh_p1PEwmRza6MoLTsYJ6LbxWEpOOarSqNcbEt8X0Jmyz-K8Kw3u81Kq0Pb-xxhzmkxcG-ZbY5S8WMssbOnVYjjDA0F1QNc-ZBAaSIgHKbz16rNq8WbRDahpVcoflzSwsOYXBAOaIkgGxuuPfUe9opl-ZrYyzBLdgAdY6La4Bwd735alMvYWgAlzgALFuVwPXTunZqcpn8atX2rovdHwi8FzXA3FwYBGXbfXksrG4VzHfqKVEVMwzZocWN1BOX90jf5LQxPsqwj_AEnkPuQ1xBBgjR3_AGtHgeGrMYadVpAafDJBkH-E6W-4Wdy1NxpjOdVgP4Zh67BVouLX5Rmp6gOgS2SJ1m_ZYreHnNEXF-Y84K3uMcOr0ajq1AnK4H4WiRNiC286TOxJVTDe8qSxwcK4uTAl41nq4D1HPa5lwVw55SVeP1KTPd-7aDAyuuR6FY3FuLPxBbmAGURbcnUn0VjGh72Q4aHkfW9x2WOWK8ccZzIzytOnZSVZgWITWC60mUSRMFwAk9OoVVLc9kmn3biTPi37LeWHwjBV2timW5XXJINuq0MNmaDme1wkwReY5Llzx_2tXJddLdSnmBC5zHsyOy7QD3hdjjOFmkxtT3gOYA5P3XvYbABcvx12bJDXTeTltCrxzKX-Fpl1Ia1vc-n5CssxuZmUm7CS0m8g_tWLia9yJtKmwD87gyNTbmtw9D4Fgy9gDQ2SJ79k_E4YscWuEFQ4JzmBpaYLYj-xXVvpNxdHOAG1GiddY1C4ssrlWkxlx47ck5qY5T1BBg6hQuSZ2GgpwKjSgpHjimY5ShyrgpQULuKxnTHVFHKRyNMbRnQmoT0SrSrOzZS9k8hrMQBOaZjy6KGviS0ixb0cMsTedb-QVH9eXmROaP3EgCCPhGW5-5CTE45pNwXHcnn0E_OOa006vZf_AFT3DmOYdLh2OWSPzon0i4GAAQTMaHnM7KpQxbGgscDfcNJcI3HJOo4gNaXmNcokFxMR8MG3zT0Vq-3EEHlrMxEcwCRKX3maSXusPDEHL0MHTvIWa_FF0tbYCTEczBuPoeSTC1s7_ECMosDP9IHe49EtG2g0Wh1xfXnv-ck81IGdhkzGuu0CTss-sTm-MDuJmYG2h2-eqlYJBabEzpEz0vB0SgsS4vCUHPLjSY-REtjxGNzcTpe0QhuFZTY1jSWujwh5Lsu8gTcDoQoG1hdkjYFzjEASbcp-yssqmc5NgCLmLctPyVW6nUhaOIewAGahOrhZ2bs4w4dZVunigdczf62OA_5Hw27qvhTP-oHHKB4dYvrbSCp6fEjlcG72AGnfmgcJvf03ZgXtabEAu-LmBmsfIrF4vT93lrwC5hzZmR8P7hG9tui6AFz2wR4coub3i8zpss7EcNDQCJaHbhxjr4TLetwlZO1zK9JvZfhNPEB-MrZvduaQxr4DNw57QRIGsdzyBXM8X9mczy-iwtY54awmQXSYBAPOVY4zx2s80sEGubTplrakC72ggEkCwbl9Z8l0vGfaKmX0zTqseGMdUDARNQBwGVh0DoDiBvlWuN1CuONnLmx7BvYcz7ta0Oc2fGQd4HIrcwuApMzeAOj4LCY_hI_p-YS1_anD13sc2sab8kAQ43c4gse1vQA30nZWRBfD2va-YLRB1IhwcdWxP-EXLlncZN66Um4-rTk0aeebOabQDabDnyXM1sFi6bi9rczHOLnNAEwTJF9xcTuuh_UtGIDabw05nB0x4Qx3iBE76WXQ1nWIAzNIkkEQAVnlbjdyNMNWa25TgPHaNd5bVYDAABIyvY2CIbe4C6R_Dab4c14cx4hrpuHDQcvIrmPamkKbm4im1ssBBDrAzE3G6dwj2jaWjK5jc5Gem54gnoDoVeN-llj83yzeJ8Be9ziWZCNfCR9dVmcEZ7qtDxb4ZOx2K9VpU24hkkAtgDLcOHMA73CysP7LB7KlIul0ktm3Vvy-i03uarL130phSYbij6Lhu0kDsVTwVJ7HupvbJbAygWkGCOhhbdanhi0Z35LEAO_afK5IXPfFZVY3V3EPE3B4FSIcdY0WY4LTp8MLmT78FpjI4CzrxB5KtV4dUa8tcQRsdkvWnn627ikUgU5w7tIU-GwbXNc5zssaCJ9VPrUy6UwnArUwPCGvaCX3OgEepWa6gQ91MeItMWSuN7P22QJXNixV_wDTik3O6C8_C3lzcVTKSbEcIToQls9OA_XEiwAnW7zfnDnER8-qnoVnuIDXTzBa0aDZw29NEIXbU7SvxIb4XHMP5W69LxHe5VjCuY5lR7muaxu-bNfo3qPoEIUnFGrVaRFxeQZIcOdx3T6OJAOUOc8QDcyyTpZwDuXz7oQn8X9atMtk3zPIzTliJ_hO2vLZXK-KZlzRlF4F3E6jU7W35oQs_qr0fjcQ0somm0S9r_eZxIcRUySADrZwGlolQUg55FMsblmSS4uLiLwQ7Ty5JEIREHEuMP8Aee7pkjKS2wbBdYC7tI3teNVo8DxlSpma4MBbAGVpBcbySZtMIQqsnqUvK0cRUDspdGa8j1j5hWaWKdBaXEgXjQW5IQsr00xVHUmuJcAA57TczOthPJc1hvZ_OXs-F7SIBggzOpHZCFeF4LLtG32beXOaS1haQDvqJkQrz-P4p-TDAtBZDA6JeSIElxP8qEK5zU6jbwXBMtN1UjM4gHW5I-K50krY4bgjDGT4XyRJmxvftHJCFFX8p-Mp0qlN7i1wLcrHiQQ8GQMthGk3XnfF_Zl7Xk0wMhJiSJbaY6hIhFysvBYSXG7dr7IcZFWmKYs5rQwm4DnActtJnoujxLy2K9g5oyvMSSCbgdTGqEK_1FvMUqtdtSlnPhqOeXAxpubjW5AVH2moP907F0spLWipBkWFnf8ASEI77PK66Z3sx7Ye9Pun0WwIJA0mdW8l1mPpmozMwwQTIdcIQn-ll1KzcNmAGYAEmPD955qHGYBwcfEYPXbVCFPwt8laxzSGNBE3Ds1-ydgK7aNb3jhYjLzvzIQhRl0vx9pfaNoltUH4jBEfRZJKELDL4eXZfdnl9EIQkT__2Q',
              createdAt: '2024-08-14T08:40:32.000Z',
              updatedAt: '2024-08-23T11:50:47.000Z',
            },
            reactions: [],
          },
        ],
        count: 1,
      };

      jest
        .spyOn(mockCommentsModel, 'findAndCountAll')
        .mockResolvedValue(result);

      const comments = await commentsService.findAll({
        query: {
          page: '1',
        },
      });

      expect(mockCommentsModel.findAndCountAll).toHaveBeenCalledTimes(1);
      expect(comments).toEqual({
        comments: result.rows,
        count: result.count,
      });
    });
  });

  describe('CommentsService findOne method', () => {
    it('should return a comment by id', async () => {
      const mockComment = {
        id: '1',
        text: 'This is a comment',
      };

      mockCommentsModel.findOne.mockResolvedValue(mockComment);

      const result = await commentsService.findOne({
        id: mockComment.id,
      });

      expect(mockCommentsModel.findOne).toHaveBeenCalledWith({
        where: { id: mockComment.id },
      });

      expect(result).toEqual(mockComment);
    });

    it('should return null if no user is found', async () => {
      mockCommentsModel.findOne.mockResolvedValue(null);

      const result = await commentsService.findOne({ id: '2' });

      expect(mockCommentsModel.findOne).toHaveBeenCalledWith({
        where: { id: '2' },
      });
      expect(result).toBeNull();
    });
  });
});
