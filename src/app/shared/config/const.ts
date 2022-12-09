import {IssuePriorityIcon} from '@tan2k/shared/models/issue-priority-icon';
import {IssuePriority, IssueType, IssueTypeIcon} from '@tan2k/shared/models';
import {IssueUtil} from '@tan2k/shared/config/issue';

export class ProjectConst {
    static readonly IssueId = 'issueId';
    static readonly Projects = 'Projects';
    static readonly Users = 'Users';
    static PrioritiesWithIcon: IssuePriorityIcon[] = [
          IssueUtil.getIssuePriorityIcon(IssuePriority.LOWEST),
          IssueUtil.getIssuePriorityIcon(IssuePriority.LOW),
          IssueUtil.getIssuePriorityIcon(IssuePriority.MEDIUM),
          IssueUtil.getIssuePriorityIcon(IssuePriority.HIGH),
          IssueUtil.getIssuePriorityIcon(IssuePriority.HIGHEST)
      ];

      static IssueTypesWithIcon: IssueTypeIcon[] = [
          new IssueTypeIcon(IssueType.BUG),
          new IssueTypeIcon(IssueType.STORY),
          new IssueTypeIcon(IssueType.TASK)
      ];
}
