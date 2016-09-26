//
//  HeartlandTokenizer.m
//  HeartlandRNExample
//
//  Created by Logsdon, Shane on 9/19/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Heartland-iOS-SDK/HpsTokenService.h>

#import "HeartlandTokenizer.h"

@implementation HeartlandTokenizer

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(tokenize:(NSString *)cardNumber
                  cardExpiration:(NSString *)cardExpiration
                  cardCvv:(NSString *)cardCvv
                  callback:(RCTResponseSenderBlock)callback)
{
  @try {
    HpsTokenService *service = [[HpsTokenService alloc] initWithPublicKey:@"pkapi_cert_dNpEYIISXCGDDyKJiV"];

    NSArray *expParts = [cardExpiration componentsSeparatedByString:@" / "];

    if ([expParts count] != 2) {
      callback(@[@"invalid date", [NSObject init]]);
      return;
    }

    [service getTokenWithCardNumber:cardNumber
                                cvc:cardCvv
                           expMonth:expParts[0]
                            expYear:expParts[1]
                   andResponseBlock:^(HpsTokenData *tokenResponse) {

                     callback(@[[NSNull null], @{
                                  @"token_value": tokenResponse.tokenValue
                     }]);
                     
                   }];
  } @catch (NSException *exception) {
    callback(@[exception.reason, [NSObject init]]);
  }
};

@end
