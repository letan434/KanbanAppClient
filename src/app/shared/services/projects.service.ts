import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, finalize } from 'rxjs/operators';
import { BaseService } from './base.service';
import { environment } from '../../../environments/environment';
import { Issue, Project, StatusModel, User } from '@tan2k/shared/models';
import { ProjectStore } from '@tan2k/shared/state/project.store';
import { arrayRemove, arrayUpsert, setLoading } from '@datorama/akita';
import { Observable, of } from 'rxjs';
import { DateUtil } from '@tan2k/shared/config/date';
import { Comment } from '@tan2k/shared/models';
import { AuthStore } from '../state/auth/auth.store';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends BaseService {

  private _sharedHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private _store: ProjectStore, private _authStore: AuthStore) {
    super();
    this._sharedHeaders = this._sharedHeaders.set('Content-Type', 'application/json');
  }
  // getAll() {
  //   return this.http.get<Project[]>(`${environment.apiUrl}/api/projects`, { headers: this._sharedHeaders })
  //     .pipe(map((response: Project[]) => {
  //       return response;
  //     }), catchError(this.handleError));
  // }
  GetUserCurrent(projectId, userId) {
    this._store.setLoading(true);
    this.http.get<User>(`${environment.apiUrl}/api/projects/${projectId}/${userId}`, { headers: this._sharedHeaders })
      .pipe(
        map((user) => {
          this._authStore.update((state) => ({
            ...state,
            ...user
          }));
        }), finalize(() => {
          this._store.setLoading(false);
        }), catchError((err) => {
          this._store.setError(err);
          return of(err);
        })).subscribe();
  }
  setLoading(isLoading: boolean) {
    this._store.setLoading(isLoading);
  }
  getDetail(id) {
    this.http.get<Project>(`${environment.apiUrl}/api/projects/${id}`, { headers: this._sharedHeaders })
      .pipe(
        setLoading(this._store),
        tap((project) => {
          this._store.update((state) => {
            return {
              ...state,
              ...project
            };
          });
        }),
        catchError((error) => {
          this._store.setError(error);
          return of(error);
        })
      ).subscribe();
  }
//   getRoleProject(id) {
//     this.http.get<StatusModel[]>(`${environment.apiUrl}/api/projects/${id}/roleProject`, { headers: this._sharedHeaders })
//       .pipe(
//         setLoading(this._store),
//         tap((statuses) => {
//             console.log(statuses, "statusesstatusesstatuses");

//             statuses.map(
//                 val=>{
//                     this._store.update((state) => {
//                         const statuses = arrayUpsert(state.statuses, val.id, val);
//                         console.log("ssss", statuses);

//                         return {
//                           ...state,
//                           ...statuses
//                         };
//                       });
//                 }
//             )

//         }),
//         catchError((error) => {
//           this._store.setError(error);
//           return of(error);
//         })
//       ).subscribe();
//   }
  updateIssueType(issue: Issue) {
    issue.lastModifiedDate = DateUtil.getNow();
    this._store.update((state) => {
      const issues = arrayUpsert(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
    console.log(issue);

    this.http.put(`${environment.apiUrl}/api/issues/${issue.id}/type`, JSON.stringify(issue), { headers: this._sharedHeaders })
    .pipe(catchError(this.handleError)).subscribe();
  }
  updateIssueStatus(issue: Issue) {
    issue.lastModifiedDate = DateUtil.getNow();
    // const allIssues = this._store.getValue().issues;
    // const issueInit = allIssues.find((x) => x.id === issue.id);
    // if (!issueInit) {
    //   return;
    // }
    this._store.update((state) => {
      const issues = arrayUpsert(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
    //let result;
     this.http.put(`${environment.apiUrl}/api/issues/${issue.id}/status`, JSON.stringify(issue), { headers: this._sharedHeaders })
        .pipe(catchError(this.handleError)).subscribe(
        //   value => {
        //   result = value;
        //   if (value) {
        //     this._store.update((state) => {
        //       const issuesInit = arrayUpsert(state.issues, issueInit.id, issueInit);
        //       return {
        //         ...state,
        //         issuesInit
        //       };
        //     });
        //   }}
        // , error => {result = false; }
        );
    // if (!result) {
    //   this._store.update((state) => {
    //     const issuesInit = arrayUpsert(state.issues, issueInit.id, issueInit);
    //     return {
    //       ...state,
    //       issuesInit
    //     };
    //   });
    //   console.log(issue);
    // }
  }
  updateIssuesStatus(issues: Issue[]): Observable<boolean> {
    issues.map((issue)=>{
      //issue.lastModifiedDate = DateUtil.getNow();
      this._store.update((state) => {
        const issues = arrayUpsert(state.issues, issue.id, issue);
        return {
          ...state,
          issues
        };
      });
    })
    return this.http.post<boolean>(`${environment.apiUrl}/api/issues/statuses`, JSON.stringify(issues), { headers: this._sharedHeaders })
        .pipe(catchError(this.handleError));
  }
  updateIssueReporter(issue: Issue) {
    issue.lastModifiedDate = DateUtil.getNow();
    this._store.update((state) => {
      const issues = arrayUpsert(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
    console.log(issue);

    this.http.put(`${environment.apiUrl}/api/issues/${issue.id}/reporter`, JSON.stringify(issue), { headers: this._sharedHeaders })
    .pipe(catchError(this.handleError)).subscribe();
  }
  updateIssuePriority(issue: Issue) {
    issue.lastModifiedDate = DateUtil.getNow();
    this._store.update((state) => {
      const issues = arrayUpsert(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
    console.log(issue);

    this.http.put(`${environment.apiUrl}/api/issues/${issue.id}/priority`, JSON.stringify(issue), { headers: this._sharedHeaders })
    .pipe(catchError(this.handleError)).subscribe();
  }
  updateIssue(issue: Issue) {
    issue.lastModifiedDate = DateUtil.getNow();
    const result = this.http.put(`${environment.apiUrl}/api/issues/${issue.id}/status`, JSON.stringify(issue), { headers: this._sharedHeaders })
        .pipe(catchError(this.handleError)).subscribe();
    if (result) {
      this._store.update((state) => {
        const issues = arrayUpsert(state.issues, issue.id, issue);
        return {
          ...state,
          issues
        };
      });
      console.log(issue);
    }
  }
  updateIssueTitle(issue: Issue) {
    issue.lastModifiedDate = DateUtil.getNow();
    this._store.update((state) => {
      const issues = arrayUpsert(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
    console.log(issue);

    this.http.put(`${environment.apiUrl}/api/issues/${issue.id}/title`, JSON.stringify(issue), { headers: this._sharedHeaders })
    .pipe(catchError(this.handleError)).subscribe();
  }
  updateIssueDateExpiration(issue: Issue) {
    issue.lastModifiedDate = DateUtil.getNow();
    this._store.update((state) => {
      const issues = arrayUpsert(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
    console.log(issue);
    return this.http.put(`${environment.apiUrl}/api/issues/${issue.id}/date-expiration`, JSON.stringify(issue), { headers: this._sharedHeaders })
    .pipe(catchError(this.handleError));
  }
  updateIssueAssignees(issue: Issue) {
    issue.lastModifiedDate = DateUtil.getNow();
    this._store.update((state) => {
      const issues = arrayUpsert(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
    console.log(issue);

    this.http.put(`${environment.apiUrl}/api/issues/${issue.id}/assignees`, JSON.stringify(issue), { headers: this._sharedHeaders })
    .pipe(catchError(this.handleError)).subscribe();
  }
  updateIssueDescription(issue: Issue) {
    issue.lastModifiedDate = DateUtil.getNow();
    this._store.update((state) => {
      const issues = arrayUpsert(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
    console.log(issue);

    this.http.put(`${environment.apiUrl}/api/issues/${issue.id}/description`, JSON.stringify(issue), { headers: this._sharedHeaders })
    .pipe(catchError(this.handleError)).subscribe();
  }
  updateIssueComment(issueId: string, comment: Comment) {
    const allIssues = this._store.getValue().issues;
    const issue = allIssues.find((x) => x.id === issueId);
    if (!issue) {
      return;
    }
    const comments = arrayUpsert(issue.comments ?? [], comment.id, comment);
    this.updateIssue({
      ...issue,
      comments
    });
    this.http.put(`${environment.apiUrl}/api/issues/${issue.id}/comment`, JSON.stringify(comment), { headers: this._sharedHeaders })
    .pipe(catchError(this.handleError)).subscribe();
  }
  createIssue(issue: Issue) {
    this._store.update((state) => {
      const issues = arrayUpsert(state.issues, issue.id, issue);
      return {
        ...state,
        issues
      };
    });
  }
  add1(enity: Issue){
    return this.http.post(`${environment.apiUrl}/api/Issues`, JSON.stringify(enity), { headers: this._sharedHeaders })
      .pipe(catchError(this.handleError));
  }
  assignUserToProject(projectId, userAssignRequest: any) {
    return this.http.put(`${environment.apiUrl}/api/projects/${projectId}/users`, JSON.stringify(userAssignRequest),
      { headers: this._sharedHeaders })
      .pipe(catchError(this.handleError));
  }
  removeUsersFromProject(projectId, usersAssignRequest: string[]) {
    let userQuery = '';
    for (const userId of usersAssignRequest) {
      userQuery += 'userIds' + '=' + userId + '&';
    }
    return this.http.delete(environment.apiUrl + '/api/projects/' + projectId + '/users?' + userQuery, { headers: this._sharedHeaders })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProject(id: string, enity: FormData) {
    // this._store.update((state) => ({
    //   ...state,
    //   ...project
    // }));
    return this.http.post(`${environment.apiUrl}/api/projects/${id}/client`, enity, {
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError(this.handleError));
  }
  deleteIssue(issueId: string) {
    this.http.delete(`${environment.apiUrl}/api/issues/${issueId}`, { headers: this._sharedHeaders })
        .pipe(catchError(this.handleError));
  }
  updateIssueAttachments(data: any){
    return this.http.post(`${environment.apiUrl}/api/issues/attachments`,data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(catchError(this.handleError));
  }
  removeAttach(id: number){
    return this.http.delete(`${environment.apiUrl}/api/issues/attachments/${id}`,{ headers: this._sharedHeaders })
    .pipe(
      catchError(this.handleError)
    );
  }
}
