//  DatePicker.m
//  By Cristobal Dabed
//  Adapted from https://github.com/phonegap/phonegap-plugins/tree/master/iOS/DatePicker
//
//
//  Phonegap DatePicker Plugin
//  Copyright (c) Greg Allen 2011
//  MIT Licensed
//
//  Additional refactoring by Sam de Freyssinet

// TODO: Show from bottom
// TODO: Allow touch input to the webview, would need to use something else besides the UIActionSheetDelegate

#import "DatePicker.h"

@interface DatePicker (Private)

// Initialize the UIActionSheet with ID <UIActionSheetDelegate> delegate UIDatePicker datePicker
- (void)initActionSheet:(id <UIActionSheetDelegate>)delegateOrNil withDatePicker:(UIDatePicker *)datePicker;

// Configure the action sheet
- (void)configureActionSheet:(NSMutableDictionary *)optionsOrNil;

// Creates the NSDateFormatter with NSString format and NSTimeZone timezone
- (NSDateFormatter *)createISODateFormatter:(NSString *)format timezone:(NSTimeZone *)timezone;

// Creates the UIDatePicker with NSMutableDictionary options
- (UIDatePicker *)createDatePicker:(CGRect)pickerFrame;

// Configures the UIDatePicker with the NSMutableDictionary options
- (void)configureDatePicker:(NSMutableDictionary *)optionsOrNil;

// Get the width of the webView
- (CGFloat)webViewWidth;

// Delegate value to plugin with state  dismiss|change|prev|next
- (void)delegateDateValueToPluginWithState;
- (void)delegateDateValueToPluginWithState:(NSString *)state;
@end

@interface DatePicker(Events)
- (void)dismissActionSheet:(id)sender;
- (void)segmentedControlValueChanged:(id)sender;
- (void)onDateValueChanged:(id)sender;
@end

@implementation DatePicker
{
	NSString *callbackId;
	BOOL delegateEventValueChanged;
}

@synthesize datePickerSheet  = _datePickerSheet;
@synthesize datePicker       = _datePicker;
@synthesize segmentedControl = _segmentedControl;
@synthesize isoDateFormatter = _isoDateFormatter;

#pragma mark - Public Methods

- (CDVPlugin *)initWithWebView:(UIWebView *)theWebView
{
	self = (DatePicker *)[super initWithWebView:theWebView];

	if (self) {
		UIDatePicker    *userDatePicker   = [self createDatePicker:CGRectMake(0, 40, 0, 0)];
		NSDateFormatter *isoTimeFormatter = [self createISODateFormatter:k_DATEPICKER_DATETIME_FORMAT timezone:[NSTimeZone defaultTimeZone]];

		self.datePicker       = userDatePicker;
		self.isoDateFormatter = isoTimeFormatter;


		[self initActionSheet:self withDatePicker:userDatePicker];
		[self.datePicker addTarget:self action:@selector(onDateValueChanged:) forControlEvents:UIControlEventValueChanged];
	}

	return self;
}

- (void)show:(CDVInvokedUrlCommand*)command
{
	if (isVisible) {
		return;
	}

	NSMutableDictionary* options = [command.arguments objectAtIndex: 0];
	[self configureDatePicker: options];
	[self configureActionSheet: options];

	[self.datePickerSheet showInView:[[super webView] superview]];
	[self.datePickerSheet setBounds:CGRectMake(0, 0, [self webViewWidth], 485)];


	callbackId = [command.callbackId copy];
	isVisible  = YES;
}

- (void)hide:(CDVInvokedUrlCommand*)command
{
	if (!isVisible) {
		return;
	}

	[self performSelector:@selector(dismissActionSheet:) withObject:self afterDelay:0.0];
}

- (void)onMemoryWarning
{
	// It could be better to close the datepicker before the system
	// clears memory. But in reality, other non-visible plugins should
	// be tidying themselves at this point. This could cause a fatal
	// at runtime.
	if (isVisible) {
		return;
	}

	[self release];
}

- (void)dealloc
{
	[_datePicker release];
	[_datePickerSheet release];
	[_isoDateFormatter release];
	[_segmentedControl release];

	if (callbackId != nil) {
		[callbackId release];
	}

	[super dealloc];
}


#pragma mark - UIActionSheetDelegate methods

- (void)actionSheet:(UIActionSheet *)actionSheet willDismissWithButtonIndex:(NSInteger)buttonIndex
{
	[self delegateDateValueToPluginWithState];
	[callbackId release];
	callbackId = nil;
}

- (void)actionSheet:(UIActionSheet *)actionSheet didDismissWithButtonIndex:(NSInteger)buttonIndex
{
	isVisible = NO;
}

- (void)willPresentActionSheet:(UIActionSheet *)actionSheet
{
	// resize subviews width's
	CGFloat width = [self webViewWidth];
	CGRect  frame;
	for (UIView *subview in [actionSheet subviews]) {
		frame = [subview frame];
		if (frame.size.width == width) {
			continue;
		}

		NSLog(@"frame.width: %d, class: %@", (int) frame.size.width, [[subview class] className]);
		[subview setFrame:CGRectMake(frame.origin.x, frame.origin.y, width, frame.size.height)];
	}

	// [[actionSheet layer] setOpaque:YES];
	// [[actionSheet layer] setBackgroundColor:[UIColor clearColor].CGColor];
}


#pragma mark - Action Events

- (void)dismissActionSheet:(id)sender {
	[self.datePickerSheet dismissWithClickedButtonIndex:0 animated:YES];
}


- (void)onDateValueChanged:(id)sender
{
	if (delegateEventValueChanged) {
		[self delegateDateValueToPluginWithState:@"change"];
	}
}

- (void)segmentedControlValueChanged:(id)sender
{
	NSInteger index = [(UISegmentedControl *)sender selectedSegmentIndex];
	NSString *state  = @"prev";
	if (index == 1) {
		state = @"next";
	}

	if (state != @"") {
		[self performSelector:@selector(dismissActionSheet:) withObject:self afterDelay:0.0];
		[self delegateDateValueToPluginWithState: state];
	}
}


#pragma mark - Private Methods

- (void)initActionSheet:(id <UIActionSheetDelegate>)delegateOrNil withDatePicker:(UIDatePicker *)datePicker
{
	// Initialize the action sheet and add the datePicker
	UIActionSheet *actionSheet = [[UIActionSheet alloc] initWithTitle:nil
															 delegate:delegateOrNil
													cancelButtonTitle:nil
											   destructiveButtonTitle:nil
													otherButtonTitles:nil];

	[actionSheet setActionSheetStyle:UIActionSheetStyleBlackTranslucent];
	[actionSheet addSubview:datePicker];


	// Create Toolbar with [prev] [next] and [done] buttons
	UISegmentedControl *segmentedControl = [[UISegmentedControl alloc] initWithItems:[NSArray arrayWithObjects:NSLocalizedString(@"Previous", @"The previous button text"), NSLocalizedString(@"Next", @"The next button text"), nil]];
	[segmentedControl addTarget:self action:@selector(segmentedControlValueChanged:) forControlEvents:UIControlEventValueChanged];
	[segmentedControl setEnabled:NO forSegmentAtIndex: 0];
	segmentedControl.segmentedControlStyle = UISegmentedControlStyleBar;
	segmentedControl.tintColor = [UIColor clearColor];
	segmentedControl.momentary = YES;

	UIBarButtonItem *segmentedControlItem = [[UIBarButtonItem alloc] initWithCustomView:segmentedControl];
	UIBarButtonItem *item = [[UIBarButtonItem alloc] initWithTitle:NSLocalizedString(@"Done", @"The done button text")
															 style:UIBarButtonItemStyleDone
															target:self
															action:@selector(dismissActionSheet:)];
	UIBarButtonItem *flexSpace = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemFlexibleSpace target:nil action:NULL];
	UIToolbar *toolbar  = [[UIToolbar alloc] initWithFrame:CGRectMake(0.0f, 0.0f, [self webViewWidth], 42.f)];
	toolbar.barStyle    = UIBarStyleBlackTranslucent;
	toolbar.translucent = YES;
	toolbar.items       = [NSArray arrayWithObjects:segmentedControlItem, flexSpace, item, nil];

	[actionSheet addSubview:toolbar];


	self.datePickerSheet = actionSheet;
	self.segmentedControl = segmentedControl;

	[segmentedControl release];
	[item        release];
	[flexSpace   release];
	[toolbar     release];
	[actionSheet release];
}

- (UIDatePicker *)createDatePicker:(CGRect)pickerFrame
{
	UIDatePicker *datePickerControl = [[UIDatePicker alloc] initWithFrame:pickerFrame];
	return [datePickerControl autorelease];
}

- (NSDateFormatter *)createISODateFormatter:(NSString *)format timezone:(NSTimeZone *)timezone;
{
	NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
	[dateFormatter setTimeZone:timezone];
	[dateFormatter setDateFormat:format];

	return [dateFormatter autorelease];
}

- (void)configureActionSheet:(NSMutableDictionary *)optionsOrNil
{
	// Delegate on change value
	if ([[optionsOrNil objectForKey:@"delegateChange"] intValue] == 1) {
		delegateEventValueChanged = YES;
	}

	// Enable segmented controls buttons
	NSString *visibility = [optionsOrNil objectForKey:@"visibility"];
	[@[@"delegatePrev", @"delegateNext"] enumerateObjectsUsingBlock:^(id key, NSUInteger index, BOOL *stop) {
		BOOL enabled = [[optionsOrNil objectForKey:key] intValue] == 1;
		[self.segmentedControl setEnabled:enabled forSegmentAtIndex: index];
	}];

	BOOL visible = [self.segmentedControl isEnabledForSegmentAtIndex: 0] || [self.segmentedControl isEnabledForSegmentAtIndex: 1];
	if ([visibility isEqualToString:@"visible"]) {
		visible = YES;
	}
	else if ([visibility isEqualToString:@"hidden"]) {
		visible = NO;
	}

	if (visible) {
		[self.segmentedControl setEnabled: YES];
		[self.segmentedControl setAlpha: 1.0];
	}
	else {
		[self.segmentedControl setEnabled: NO];
		[self.segmentedControl setAlpha: 0];
	}
}

- (void)configureDatePicker:(NSMutableDictionary *)optionsOrNil
{
	NSString *mode       = [optionsOrNil objectForKey:@"mode"];
	NSString *dateString = [optionsOrNil objectForKey:@"date"];

	BOOL allowOldDates    = NO;
	BOOL allowFutureDates = YES;

	if ([[optionsOrNil objectForKey:@"allowOldDates"] intValue] == 1) {
		allowOldDates = YES;
	}

	if ( ! allowOldDates) {
		self.datePicker.minimumDate = [NSDate date];
	}

	if ([[optionsOrNil objectForKey:@"allowFutureDates"] intValue] == 0) {
		allowFutureDates = NO;
	}

	if ( ! allowFutureDates) {
		self.datePicker.maximumDate = [NSDate date];
	}

	if ([dateString length] == 0) {
		self.datePicker.date = [NSDate date];
	}
	else {
		self.datePicker.date = [self.isoDateFormatter dateFromString:dateString];
	}

	if ([mode isEqualToString:@"date"]) {
		self.datePicker.datePickerMode = UIDatePickerModeDate;
	}
	else if ([mode isEqualToString:@"time"]) {
		self.datePicker.datePickerMode = UIDatePickerModeTime;
	}
	else {
		self.datePicker.datePickerMode = UIDatePickerModeDateAndTime;
	}
}

- (void)delegateDateValueToPluginWithState
{
	[self delegateDateValueToPluginWithState:@"dismiss"];
}

- (void)delegateDateValueToPluginWithState:(NSString *)state
{
	// Send dictionary with date valued and wether it's an changed valued operation otherwise interpreted as dismiss
	NSDictionary * options = @{
		@"value": [NSNumber numberWithDouble:[self.datePicker.date timeIntervalSince1970]],
		@"state": state
	};

	// create the plugin result and make sure to set it to be keeped
	CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary: options];
	pluginResult.keepCallback     = [NSNumber numberWithBool:YES];

	// send the result back
	[self.commandDelegate sendPluginResult:pluginResult callbackId: callbackId];
}

- (CGFloat)webViewWidth
{
	return [[super webView] bounds].size.width;
}

@end
