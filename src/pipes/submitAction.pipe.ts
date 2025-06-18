
type Steps<D,O,A,C> = {
  dto:(data:D) => O;
  api:(object:O) => Promise<A>;
  callback:(apiOutput:A) => C;
}

export default async function submitActionPipe<D,O,A,C>(data:D, steps:Steps<D,O,A,C>){
  const { dto, api, callback } = steps;
  const result = await api(dto(data));
  return callback(result);
};
