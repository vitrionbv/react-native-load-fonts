#import "LoadFonts.h"
#import <CoreText/CoreText.h>

@implementation LoadFonts


RCT_EXPORT_MODULE();

- (void)loadFontWithData:(CGDataProviderRef)fontDataProvider
                callback:(RCTResponseSenderBlock)callback {
    CGFontRef newFont = CGFontCreateWithDataProvider(fontDataProvider);
    NSString *newFontName =
    (__bridge_transfer NSString *)CGFontCopyPostScriptName(newFont);

    UIFont *font = [UIFont fontWithName:newFontName size:16];
    if (font != nil) {
        CGDataProviderRelease(fontDataProvider);
        callback(@[ [NSNull null], newFontName ]);
        return;
    }

    CFErrorRef error;
    if (!CTFontManagerRegisterGraphicsFont(newFont, &error)) {
        CFStringRef errorDescription = CFErrorCopyDescription(error);
        NSLog(@"Failed to register font: %@", errorDescription);

        callback(@[
            @"Failed to register font: %@",
            (__bridge_transfer NSString *)errorDescription
        ]);

        CFRelease(errorDescription);
        CGFontRelease(newFont);
        CGDataProviderRelease(fontDataProvider);

        return;
    }

    CGFontRelease(newFont);
    CGDataProviderRelease(fontDataProvider);
    callback(@[ [NSNull null], newFontName ]);
}

RCT_EXPORT_METHOD(loadFont
                  : (NSDictionary *)options callback
                  : (RCTResponseSenderBlock)callback) {
    NSString *name = [options valueForKey:@"name"];
    NSString *data = [options valueForKey:@"data"];
    NSString *type = NULL;


    if ([name isEqual:[NSNull null]]) {
        callback(@[ @"Name property is empty" ]);
        return;
    }

    if ([data isEqual:[NSNull null]]) {
        callback(@[ @"Data property is empty" ]);
        return;
    }

    if ([[[data substringWithRange:NSMakeRange(0, 5)] lowercaseString]
         isEqualToString:@"data:"]) {
        NSArray *parts = [data componentsSeparatedByString:@","];
        NSString *mimeType = [parts objectAtIndex:0];

        data = [parts objectAtIndex:1];

        if (![mimeType isEqual:[NSNull null]]) {
            mimeType = [[[mimeType substringFromIndex:5]
                         componentsSeparatedByString:@";"] objectAtIndex:0];

            if ([mimeType isEqualToString:@"application/x-font-ttf"] ||
                [mimeType isEqualToString:@"application/x-font-truetype"] ||
                [mimeType isEqualToString:@"font/ttf"]) {
                type = @"ttf";
            } else if ([mimeType isEqualToString:@"application/x-font-opentype"] ||
                       [mimeType isEqualToString:@"font/opentype"]) {
                type = @"otf";
            }
        }
    }

    if ([type isEqual:[NSNull null]])
        type = [options valueForKey:@"type"];

    if ([type isEqual:[NSNull null]])
        type = @"ttf";

    NSData *decodedData = [[NSData alloc]
                           initWithBase64EncodedString:data
                           options:NSDataBase64DecodingIgnoreUnknownCharacters];
    CGDataProviderRef fontDataProvider =
    CGDataProviderCreateWithCFData((__bridge CFDataRef)decodedData);
    [self loadFontWithData:fontDataProvider callback:callback];
}

RCT_EXPORT_METHOD(loadFontFromFile
                  : (NSDictionary *)options callback
                  : (RCTResponseSenderBlock)callback) {
    NSString *name = [options valueForKey:@"name"];
    NSString *filePath = [options valueForKey:@"filePath"];
    NSString *type = NULL;

    if ([name isEqual:[NSNull null]]) {
        callback(@[ @"Name property is empty" ]);
        return;
    }

    if ([filePath isEqual:[NSNull null]]) {
        callback(@[ @"FilePath property is empty" ]);
        return;
    }

    if ([type isEqual:[NSNull null]])
        type = [options valueForKey:@"type"];

    if ([type isEqual:[NSNull null]])
        type = @"ttf";

    CGDataProviderRef fontDataProvider =
    CGDataProviderCreateWithFilename(filePath.fileSystemRepresentation);
    [self loadFontWithData:fontDataProvider callback:callback];
}

@end
