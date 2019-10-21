import { Errors } from "../format";
import { message } from "../utils/errors";

//For when we need to throw an error, here's a wrapper class that extends Error.
//Apologies about the confusing name, but I wanted something that would make
//sense should it not be caught and thus accidentally exposed to the outside.
export class DecodingError extends Error {
  public error: Errors.ErrorForThrowing;
  constructor(error: Errors.ErrorForThrowing) {
    super(message(error));
    this.error = error;
    this.name = "DecodingError";
  }
}

//used to stop decoding; like DecodingError, but used in contexts
//where I don't expect it to be caught
//NOTE: currently we don't actually check the type of a thrown error,
//we just rely on context.  still, I think it makes sense to be a separate
//type.
export class StopDecodingError extends Error {
  public error: Errors.DecoderError;
  public allowRetry: boolean; //setting this to true means that, if the error occurs
  //when decoding in full mode, we allow an ABI-mode retry.  (if we were already in
  //ABI mode, we give up.)
  constructor(error: Errors.DecoderError, allowRetry?: boolean) {
    const message = `Stopping decoding: ${error.kind}`; //sorry about the bare-bones message,
    //but again, users shouldn't actually see this, so I think this should suffice for now
    super(message);
    this.error = error;
    this.allowRetry = Boolean(allowRetry);
  }
}
