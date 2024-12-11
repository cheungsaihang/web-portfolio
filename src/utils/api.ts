type ApiFunction = (arg:any) => Promise<any>;
type ApiParameter = ApiFunction extends (arg: infer U) => any ? U : never;
//type ApiReturn<F> = F extends(arg: any) => infer R ? R :never;
type ApiResponse<E,D> = ApiSuccess<D> | ApiFail<E>;

interface ApiSuccess<D> {
  success:true,
  data: D
}
interface ApiFail<E> {
  success:false,
  error:E
}

const apiSuccess = <D,E=never>(d:D):ApiResponse<E,D> => ({
  success:true,
  data:d
});
const apiFail = <E,D=never>(e:E):ApiResponse<E,D> => ({
  success:false,
  error:e
});

export const isApiSuccess = <E,D>(x:ApiResponse<E,D>):x is ApiSuccess<D> => x.success;

export const apiHandler = async <E,D>(callApi:ApiFunction, a:ApiParameter):Promise<ApiResponse<E,D>> => {
  const res = await callApi(a).then((data) => {
      return apiSuccess(data);
    }).catch((error) => {
      console.error(error);
      return apiFail(error);
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