import { CultureCode } from '../../shared/models/Enums'
import { IAppModel, AppModel } from './AppModel';
import { IStaticText, StaticText } from './StaticText';
import { Router } from './Router';
import { IExperienceItem, IExperienceItemClientDto, ExperienceItem } from './ExperienceItem';
import { IJobServerDto, IJob, Job } from './Job';
import { ICvErrorHandler, CvErrorHandler } from './ErrorHandler';
import { ICvLogger, CvLogger } from './Logger';
import { IMediator } from '../mediator/Mediator';


declare var Experience: IExperienceItem[];
declare var Jobs: IJobServerDto[];

$(document).ready(() => {
	var logger = new CvLogger();
    var errorHandler = new CvErrorHandler(this, logger);

    // Set static text
    StaticText.Init(CultureCode.en_GB);

    // Set the model data
    var mainPageContainerId = "page-content-container";
    AppModel.Init(Experience, Jobs, logger, errorHandler, mainPageContainerId);
});