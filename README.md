# SKETCH STATE MACHINE

YOU WILL USE SKETCH STATE MACHINES SERVICE DIRECTLY INSIDE SKETCH

`state_machines/sketch_state_machine.ts`

## NECU KORISTITI `useService` ZA WEBGL, STO JE I LOGICNO

KORISTICU `service.send()` I `service.state`

## PROBLEMI SA GLSLIFY SU UCINILI DA PROMENIM APPROACH

NEMAM MOGUCNOST #pragma IMPORT-A SA WEBPACK-OM

MORAM DA KORISTIM IFRAME APPROACH, GDE CU SAGRADITI CODE I TEK GA ONDA EMBED-OVATI KAO IFRAME

MEDJUTIM, POSTO MOGU KORISTITI STATE MACHINE, SVE CE BITI OK

# USPEO SAM DA POSTIGNEM DA KORISTIM IFRAME

I TO LOAD-OVAO SAM HTML KROZ `getStaticProps` INTO INDEX PAGE

STO ZNACI DA CU UI, ODNOSNO DUGMAD MORATI DEFINISATI DIREKTNO U SKETCH-U, STO ZNACI DA CU MACHINE MORATI DEFINISATI DIREKTNO VEZANO SA SKETCH-OM

