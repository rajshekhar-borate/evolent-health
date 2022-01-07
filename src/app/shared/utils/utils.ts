export class Utils {
  public static removeEmptyProperties(obj: any): any {
    return Object.keys(obj)
      .filter((k) => !(obj[k] == null || obj[k] == ''))
      .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
  }

  public static filterBySearchCriteria<T>(
    records: T[],
    searchCriteria: any
  ): T[] {
    return records.filter((record) => {
      return Object.keys(searchCriteria).every((propName) => {
        if (propName == 'status') {
          return (
            record[propName].toLocaleLowerCase() ===
            searchCriteria[propName].toLocaleLowerCase()
          );
        }

        if (propName == 'phoneNumber') {
          return record[propName] === Number(searchCriteria[propName]);
        }

        return record[propName]
          .toLocaleLowerCase()
          .includes(searchCriteria[propName].toLocaleLowerCase());
      });
    });
  }
}
