
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNLoadFontsSpec.h"

@interface LoadFonts : NSObject <NativeLoadFontsSpec>
#else
#import <React/RCTBridgeModule.h>

@interface LoadFonts : NSObject <RCTBridgeModule>
#endif

@end
