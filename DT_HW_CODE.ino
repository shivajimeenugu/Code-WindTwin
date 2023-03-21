#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);

#include "TimerOne.h"

const byte MOTOR1 = 2;  // Motor 1 Interrupt Pin - INT 0

// Integers for pulse counters
unsigned int counter1 = 0;

// Float for number of slots in encoder disk
float diskslots = 20;  // Change to match value of encoder disk
float rotation1=0.00;

//voltage Sensor
float vOUT = 0.0;
float vIN = 0.0;
float R1 = 30000.0;
float R2 = 7500.0;

// Interrupt Service Routines

// Motor 1 pulse count ISR
void ISR_count1()  
{
  counter1++;  // increment Motor 1 counter value
} 

// TimerOne ISR
void ISR_timerone()
{
  Timer1.detachInterrupt();  // Stop the timer
  Serial.print("{\"M\":\""); 
  rotation1 = (counter1 / diskslots) * 60.00;  // calculate RPM for Motor 1
  Serial.print(rotation1);  

  counter1 = 0;  //  reset counter to zero
  Timer1.attachInterrupt( ISR_timerone );  // Enable the timer
}

void setup() 
{
  
  Serial.begin(9600);
    if (!accel.begin()) {
    Serial.println("Could not find a valid ADXL345 sensor, check wiring!");
//    while (1);
  }
   accel.setRange(ADXL345_RANGE_16_G);
  Timer1.initialize(1000000); // set timer for 1sec
  attachInterrupt(digitalPinToInterrupt (MOTOR1), ISR_count1, RISING);  // Increase counter 1 when speed sensor pin goes High
  Timer1.attachInterrupt( ISR_timerone ); // Enable the timer
} 

void loop()
{
  //For Vibration
  sensors_event_t event;
  accel.getEvent(&event);
  float x = event.acceleration.x;
  float y = event.acceleration.y;
  float z = event.acceleration.z;
  Serial.print("\", \"X_Y_Z\":\"");
  Serial.print(x);
  Serial.print("_");
  Serial.print(y);
  Serial.print("_");
  Serial.print(z);
  //For Voltage
  int sensorValue = analogRead(A0);
  vOUT = (sensorValue * 5.0) / 1024.0;
  vIN = vOUT / (R2/(R1+R2));
  Serial.print("\", \"V\":\"");
  Serial.print(vIN);
  Serial.println("\"}");
  delay(1000);
}
