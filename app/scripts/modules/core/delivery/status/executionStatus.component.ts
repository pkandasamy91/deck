import {IComponentController, IComponentOptions, module} from 'angular';

import {EXECUTION_USER_FILTER} from './executionUser.filter';
import {IExecution} from 'core/domain/IExecution';


import './executionStatus.less';

export class ExecutionStatusController implements IComponentController {
  public execution: IExecution;
  public toggleDetails: (node: {executionId: string, index: number}) => void;
  public showingDetails: boolean;
  public standalone: boolean;

  public filter: any;
  public sortFilter: any;
  public parameters: { key: string, value: any }[];

  static get $inject(): string[] { return ['ExecutionFilterModel']; }

  constructor(private ExecutionFilterModel: any) {}

  public $onInit(): void {
    // these are internal parameters that are not useful to end users
    const strategyExclusions = [
      'parentPipelineId',
      'strategy',
      'parentStageId',
      'deploymentDetails',
      'cloudProvider'
    ];

    this.filter = this.ExecutionFilterModel.sortFilter;

    if (this.execution.trigger && this.execution.trigger.parameters) {
      this.parameters = Object.keys(this.execution.trigger.parameters).sort()
        .filter((paramKey) => this.execution.isStrategy ? !strategyExclusions.includes(paramKey) : true)
        .map((paramKey: string) => {
          return { key: paramKey, value: this.execution.trigger.parameters[paramKey] };
        });
    }
  }
}

export class ExecutionStatusComponent implements IComponentOptions {
  public bindings: any = {
    execution: '<',
    toggleDetails: '&',
    showingDetails: '<',
    standalone: '<',
  };
  public controller: any = ExecutionStatusController;
  public templateUrl: string = require('./executionStatus.html');
}

export const EXECUTION_STATUS_COMPONENT = 'spinnaker.core.delivery.executionStatus.component';
module(EXECUTION_STATUS_COMPONENT, [
  require('../filter/executionFilter.model.js'),
  EXECUTION_USER_FILTER
])
.component('executionStatus', new ExecutionStatusComponent());
