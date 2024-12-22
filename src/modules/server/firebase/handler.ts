type FBFunction = (...arg:any) => Promise<any>;
type FBParameter = FBFunction extends (arg: infer U) => any ? U : never;
type FBResponse<E,D> = FBSuccess<D> | FBFail<E>;

interface FBSuccess<D> {
  success:true,
  data: D
}
interface FBFail<E> {
  success:false,
  error:E
}

const FBSuccess = <D,E=never>(d:D):FBResponse<E,D> => ({
  success:true,
  data:d
});
const FBFail = <E,D=never>(e:E):FBResponse<E,D> => ({
  success:false,
  error:e
});

export const isFBSuccess = <E,D>(x:FBResponse<E,D>):x is FBSuccess<D> => x.success;

export const firebaseHandler = async <E,D>(callFb:FBFunction, ...a:FBParameter):Promise<FBResponse<E,D>> => {
  const res = await callFb(...a).then((data) => {
      return FBSuccess(data);
    }).catch((error) => {
      console.error(error);
      return FBFail(error);
    });
  return Promise.resolve(res);
}

/*

  error: [StorageError [FirebaseError]: Firebase Storage: Object 'images/hiking/dragons-back/img04.jpg' does not exist. (storage/object-not-found)] {
    code: 'storage/object-not-found',
    customData: { serverResponse: '' },
    status_: 0,
    _baseMessage: "Firebase Storage: Object 'images/hiking/dragons-back/img04.jpg' does not exist. (storage/object-not-found)"
  }
*/