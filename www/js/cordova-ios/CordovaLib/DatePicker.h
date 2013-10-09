//	DatePicker.h
//	Copyright (c) Cristobal Dabed 2013
//	MIT Licensed
//
//  Adapted from https://github.com/phonegap/phonegap-plugins/tree/master/iOS/DatePicker

//	Phonegap DatePicker Plugin
//	Copyright (c) Greg Allen 2011
//	MIT Licensed
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

#ifndef k_DATEPICKER_DATETIME_FORMAT
#define k_DATEPICKER_DATETIME_FORMAT @"yyyy-MM-dd'T'HH:mm:ss'Z'"
#endif

@interface DatePicker : CDVPlugin <UIActionSheetDelegate> {
	UIActionSheet   *_datePickerSheet;
	UIDatePicker    *_datePicker;
	UISegmentedControl *_segmentedControl;
	NSDateFormatter    *_isoDateFormatter;
	BOOL isVisible;
}

@property (nonatomic, retain) UISegmentedControl *segmentedControl;
@property (nonatomic, retain) UIActionSheet*   datePickerSheet;
@property (nonatomic, retain) UIDatePicker*    datePicker;
@property (nonatomic, retain) NSDateFormatter* isoDateFormatter;


//- (void) prepare:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;
- (void)show:(CDVInvokedUrlCommand*)command;
- (void)hide:(CDVInvokedUrlCommand*)command;
@end
